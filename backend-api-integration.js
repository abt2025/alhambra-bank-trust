// Alhambra Bank & Trust - Complete Backend API Integration
// This file contains the complete backend API structure for integration

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const redis = require('redis');
const AWS = require('aws-sdk');

// Initialize Express app
const app = express();

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Redis connection
const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

// AWS S3 configuration
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});
app.use('/api/', limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Authentication middleware
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.userId]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = result.rows[0];
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// IBOSS Service Integration
class IBOSSService {
  static async authenticateUser(bankCredentials, ibossCredentials) {
    try {
      // Validate bank credentials
      const userResult = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [bankCredentials.username]
      );

      if (userResult.rows.length === 0) {
        throw new Error('Invalid bank credentials');
      }

      const user = userResult.rows[0];
      const isValidPassword = await bcrypt.compare(bankCredentials.password, user.password_hash);
      
      if (!isValidPassword) {
        throw new Error('Invalid bank credentials');
      }

      // Mock IBOSS authentication (replace with actual IBOSS API call)
      const ibossAuth = await this.authenticateWithIBOSS(ibossCredentials);
      
      return {
        valid: true,
        sessionToken: ibossAuth.sessionToken,
        userId: user.id
      };
    } catch (error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
  }

  static async authenticateWithIBOSS(credentials) {
    // Mock IBOSS authentication - replace with actual IBOSS XML API call
    if (credentials.username === 'iboss_user' && credentials.password === 'iboss_pass') {
      return {
        valid: true,
        sessionToken: 'mock-iboss-session-token-' + Date.now()
      };
    }
    throw new Error('Invalid IBOSS credentials');
  }

  static async getPortfolioData(sessionToken, userId) {
    try {
      // Check cache first
      const cacheKey = `portfolio:${userId}`;
      const cachedData = await redisClient.get(cacheKey);
      
      if (cachedData) {
        return JSON.parse(cachedData);
      }

      // Mock portfolio data - replace with actual IBOSS API calls
      const portfolioData = {
        totalEquity: 125750.50,
        dayPL: 2150.25,
        dayPLPercent: 1.74,
        cashBalance: 15250.75,
        buyingPower: 45000,
        lastUpdated: new Date().toISOString(),
        holdings: [
          {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            shares: 150,
            price: 175.50,
            value: 26325,
            dayPL: 1250.75,
            dayPLPercent: 4.98,
            sector: 'Technology',
            country: 'US'
          },
          {
            symbol: 'GOOGL',
            name: 'Alphabet Inc.',
            shares: 75,
            price: 142.30,
            value: 10672.50,
            dayPL: -325.25,
            dayPLPercent: -2.95,
            sector: 'Technology',
            country: 'US'
          },
          {
            symbol: 'MSFT',
            name: 'Microsoft Corporation',
            shares: 200,
            price: 378.85,
            value: 75770,
            dayPL: 2150.50,
            dayPLPercent: 2.92,
            sector: 'Technology',
            country: 'US'
          },
          {
            symbol: 'TSLA',
            name: 'Tesla Inc.',
            shares: 50,
            price: 248.75,
            value: 12437.50,
            dayPL: -485.75,
            dayPLPercent: -3.76,
            sector: 'Consumer Discretionary',
            country: 'US'
          },
          {
            symbol: 'NVDA',
            name: 'NVIDIA Corporation',
            shares: 75,
            price: 291.75,
            value: 21881.25,
            dayPL: 1875.50,
            dayPLPercent: 3.38,
            sector: 'Technology',
            country: 'US'
          }
        ],
        performance: {
          daily: { return: 1.74, value: 2150.25 },
          weekly: { return: 3.8, value: 4725.50 },
          monthly: { return: 5.2, value: 6425.75 },
          quarterly: { return: 8.7, value: 10875.25 },
          yearly: { return: 15.8, value: 19650.50 },
          threeYear: { return: 42.5, value: 52875.75 },
          fiveYear: { return: 85.2, value: 106250.25 }
        },
        allocation: {
          sectors: [
            { name: 'Technology', percentage: 67.8, value: 85248.75 },
            { name: 'Consumer Discretionary', percentage: 9.9, value: 12437.50 },
            { name: 'Financial Services', percentage: 9.2, value: 11569.05 },
            { name: 'Healthcare', percentage: 7.7, value: 9682.79 },
            { name: 'Communication Services', percentage: 5.4, value: 6790.53 }
          ],
          countries: [
            { name: 'United States', code: 'US', percentage: 85.2, value: 107189.43 },
            { name: 'China', code: 'CN', percentage: 6.8, value: 8551.03 },
            { name: 'Taiwan', code: 'TW', percentage: 3.2, value: 4024.02 },
            { name: 'South Korea', code: 'KR', percentage: 2.5, value: 3143.76 },
            { name: 'Netherlands', code: 'NL', percentage: 1.8, value: 2263.51 }
          ],
          assetClasses: [
            { name: 'Equities', percentage: 89.2, value: 112219.45 },
            { name: 'Fixed Income', percentage: 6.4, value: 8048.03 },
            { name: 'Cash & Alternatives', percentage: 4.4, value: 5533.02 }
          ]
        },
        riskMetrics: {
          beta: 1.15,
          alpha: 2.45,
          sharpeRatio: 1.42,
          standardDeviation: 18.7,
          sortinoRatio: 1.89,
          informationRatio: 0.51,
          maxDrawdown: -8.5,
          var95: -8450,
          expectedShortfall: -12750
        }
      };

      // Cache for 5 minutes
      await redisClient.setex(cacheKey, 300, JSON.stringify(portfolioData));
      
      return portfolioData;
    } catch (error) {
      throw new Error(`Failed to fetch portfolio data: ${error.message}`);
    }
  }
}

// API Routes

// Authentication Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/portfolio-login', async (req, res) => {
  try {
    const { bankCredentials, ibossCredentials } = req.body;
    
    const authResult = await IBOSSService.authenticateUser(bankCredentials, ibossCredentials);
    
    if (!authResult.valid) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const portfolioData = await IBOSSService.getPortfolioData(authResult.sessionToken, authResult.userId);
    
    res.json({
      success: true,
      sessionToken: authResult.sessionToken,
      portfolioData
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Portfolio Routes
app.get('/api/portfolio/overview', authenticateToken, async (req, res) => {
  try {
    const portfolioData = await IBOSSService.getPortfolioData('session-token', req.user.id);
    res.json(portfolioData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/portfolio/holdings', authenticateToken, async (req, res) => {
  try {
    const portfolioData = await IBOSSService.getPortfolioData('session-token', req.user.id);
    res.json({ holdings: portfolioData.holdings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/portfolio/performance', authenticateToken, async (req, res) => {
  try {
    const { period } = req.query;
    const portfolioData = await IBOSSService.getPortfolioData('session-token', req.user.id);
    res.json({ performance: portfolioData.performance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/portfolio/allocation', authenticateToken, async (req, res) => {
  try {
    const portfolioData = await IBOSSService.getPortfolioData('session-token', req.user.id);
    res.json({ allocation: portfolioData.allocation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/portfolio/share', authenticateToken, async (req, res) => {
  try {
    const { email, message } = req.body;
    const portfolioData = await IBOSSService.getPortfolioData('session-token', req.user.id);
    
    // Mock email sending - replace with actual email service
    console.log(`Sharing portfolio with ${email}: ${message}`);
    
    res.json({ success: true, message: 'Portfolio shared successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Account Opening Routes
app.post('/api/accounts/open', async (req, res) => {
  try {
    const { accountType, personalInfo, documents } = req.body;
    
    // Create account record
    const accountResult = await pool.query(
      'INSERT INTO accounts (account_type, status, created_at) VALUES ($1, $2, NOW()) RETURNING *',
      [accountType, 'pending']
    );
    
    const account = accountResult.rows[0];
    
    res.json({
      success: true,
      accountId: account.id,
      status: account.status,
      message: 'Account opening initiated successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Video KYC Routes
app.post('/api/kyc/video/initiate', authenticateToken, async (req, res) => {
  try {
    const { accountId } = req.body;
    
    // Create video KYC session
    const sessionResult = await pool.query(
      'INSERT INTO video_kyc_sessions (user_id, session_token, status, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [req.user.id, 'session-' + Date.now(), 'scheduled']
    );
    
    const session = sessionResult.rows[0];
    
    res.json({
      success: true,
      sessionId: session.id,
      sessionToken: session.session_token,
      status: session.status
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Document Upload Routes
app.post('/api/documents/upload', authenticateToken, async (req, res) => {
  try {
    // Mock file upload to S3 - implement actual multer-s3 middleware
    const { documentType } = req.body;
    
    const documentResult = await pool.query(
      'INSERT INTO kyc_documents (user_id, document_type, status, uploaded_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [req.user.id, documentType, 'uploaded']
    );
    
    const document = documentResult.rows[0];
    
    res.json({
      success: true,
      documentId: document.id,
      status: document.status
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health Check
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    await pool.query('SELECT 1');
    
    // Check Redis connection
    await redisClient.ping();
    
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      services: {
        database: 'OK',
        redis: 'OK'
      }
    });
  } catch (error) {
    res.status(503).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Alhambra Bank API server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;
