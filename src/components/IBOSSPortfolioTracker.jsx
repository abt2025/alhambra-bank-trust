import React, { useState, useEffect } from 'react';

const IBOSSPortfolioTracker = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showIbossPassword, setShowIbossPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
    ibossUsername: '',
    ibossPassword: ''
  });

  // Demo portfolio data
  const portfolioData = {
    totalEquity: 125750.50,
    cashBalance: 15250.75,
    dayPnL: 2150.25,
    dayPnLPercent: 1.74,
    buyingPower: 45000,
    holdings: [
      { symbol: 'AAPL', name: 'Apple Inc.', shares: 150, price: 175.50, value: 26325, pnl: 1250.75, pnlPercent: 4.98 },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 75, price: 142.30, value: 10672.50, pnl: -325.25, pnlPercent: -2.95 },
      { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 200, price: 378.85, value: 75770, pnl: 2150.50, pnlPercent: 2.92 },
      { symbol: 'TSLA', name: 'Tesla Inc.', shares: 50, price: 248.75, value: 12437.50, pnl: -485.75, pnlPercent: -3.76 }
    ],
    performance: {
      daily: 1.74,
      monthly: 5.2,
      quarterly: 8.7,
      yearly: 15.8,
      threeYear: 42.5,
      fiveYear: 85.2
    },
    allocation: {
      sectors: [
        { name: 'Technology', percentage: 45, value: 56587.75 },
        { name: 'Healthcare', percentage: 20, value: 25150.10 },
        { name: 'Finance', percentage: 15, value: 18862.58 },
        { name: 'Energy', percentage: 10, value: 12575.05 },
        { name: 'Other', percentage: 10, value: 12575.02 }
      ]
    },
    riskMetrics: {
      beta: 1.15,
      alpha: 2.3,
      sharpeRatio: 1.42,
      standardDeviation: 18.5,
      maxDrawdown: -12.8,
      valueAtRisk: -8.2
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Demo login - in production, this would validate against backend
    if (loginForm.username && loginForm.password && loginForm.ibossUsername && loginForm.ibossPassword) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ username: '', password: '', ibossUsername: '', ibossPassword: '' });
  };

  const generateStatement = (template) => {
    // Generate statement HTML with Alhambra Bank branding
    const statementHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Alhambra Bank & Trust - Portfolio Statement</title>
        <style>
          body { font-family: 'Times New Roman', serif; margin: 40px; color: #333; }
          .header { text-align: center; border-bottom: 3px solid #8B4513; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { max-width: 300px; margin-bottom: 10px; }
          .bank-info { color: #8B4513; font-size: 14px; }
          .statement-title { font-size: 24px; font-weight: bold; margin: 30px 0; text-align: center; }
          .summary-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .summary-table th, .summary-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          .summary-table th { background-color: #f8f4e6; color: #8B4513; }
          .holdings-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .holdings-table th, .holdings-table td { border: 1px solid #ddd; padding: 8px; text-align: right; }
          .holdings-table th { background-color: #f8f4e6; color: #8B4513; }
          .positive { color: #22c55e; }
          .negative { color: #ef4444; }
          .footer { margin-top: 40px; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="bank-info">
            <strong>Alhambra Bank & Trust Limited</strong><br/>
            Governors Square, 23 Lime Tree Bay Ave<br/>
            Grand Cayman KY1-1205, Cayman Islands<br/>
            Phone: +1 (345) 623-8200 | Email: info@alhambrabank.ky<br/>
            Licensed by CIMA | Regulated Financial Institution
          </div>
        </div>
        
        <div class="statement-title">Portfolio Statement - ${new Date().toLocaleDateString()}</div>
        
        <table class="summary-table">
          <tr><th>Account Summary</th><th>Value</th></tr>
          <tr><td>Total Equity</td><td>$${portfolioData.totalEquity.toLocaleString()}</td></tr>
          <tr><td>Cash Balance</td><td>$${portfolioData.cashBalance.toLocaleString()}</td></tr>
          <tr><td>Day P&L</td><td class="${portfolioData.dayPnL >= 0 ? 'positive' : 'negative'}">$${portfolioData.dayPnL.toLocaleString()} (${portfolioData.dayPnLPercent}%)</td></tr>
          <tr><td>Buying Power</td><td>$${portfolioData.buyingPower.toLocaleString()}</td></tr>
        </table>
        
        <table class="holdings-table">
          <tr><th>Symbol</th><th>Name</th><th>Shares</th><th>Price</th><th>Value</th><th>P&L</th></tr>
          ${portfolioData.holdings.map(holding => `
            <tr>
              <td>${holding.symbol}</td>
              <td style="text-align: left;">${holding.name}</td>
              <td>${holding.shares}</td>
              <td>$${holding.price}</td>
              <td>$${holding.value.toLocaleString()}</td>
              <td class="${holding.pnl >= 0 ? 'positive' : 'negative'}">$${holding.pnl.toLocaleString()} (${holding.pnlPercent}%)</td>
            </tr>
          `).join('')}
        </table>
        
        <div class="footer">
          <p><strong>Important Disclosures:</strong></p>
          <p>This statement is provided for informational purposes only. Past performance does not guarantee future results. All investments carry risk of loss. Please consult with your financial advisor before making investment decisions.</p>
          <p>Alhambra Bank & Trust Limited is licensed by the Cayman Islands Monetary Authority (CIMA) and is committed to maintaining the highest standards of financial services.</p>
          <p>Generated on: ${new Date().toLocaleString()} | Statement Type: ${template}</p>
        </div>
      </body>
      </html>
    `;
    
    // Create and download the statement
    const blob = new Blob([statementHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alhambra-bank-statement-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const printStatement = () => {
    window.print();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-2xl border-2 border-red-200">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 rounded-t-lg text-center">
              <h2 className="text-2xl font-bold">IBOSS Portfolio Tracker</h2>
              <p className="text-red-100 mt-2">Access your trading portfolio and analytics</p>
            </div>
            <div className="p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-red-800 font-semibold">Bank Username</label>
                  <input
                    type="text"
                    placeholder="Enter your bank username"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                    className="w-full p-3 border border-red-200 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-red-800 font-semibold">Bank Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your bank password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      className="w-full p-3 border border-red-200 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 pr-10"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '👁️' : '🔒'}
                    </button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="space-y-2">
                    <label className="block text-red-800 font-semibold">IBOSS Trading Username</label>
                    <input
                      type="text"
                      placeholder="Your IBOSS trading username"
                      value={loginForm.ibossUsername}
                      onChange={(e) => setLoginForm({...loginForm, ibossUsername: e.target.value})}
                      className="w-full p-3 border border-red-200 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <label className="block text-red-800 font-semibold">IBOSS Trading Password</label>
                    <div className="relative">
                      <input
                        type={showIbossPassword ? "text" : "password"}
                        placeholder="Your IBOSS trading password"
                        value={loginForm.ibossPassword}
                        onChange={(e) => setLoginForm({...loginForm, ibossPassword: e.target.value})}
                        className="w-full p-3 border border-red-200 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 pr-10"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-500"
                        onClick={() => setShowIbossPassword(!showIbossPassword)}
                      >
                        {showIbossPassword ? '👁️' : '🔒'}
                      </button>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all"
                >
                  🔐 Secure Login
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-red-600">
                  Demo: bank_user / bank_pass / iboss_user / iboss_pass
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Portfolio Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <div>
              <h1 className="text-xl font-bold text-red-800">IBOSS Portfolio Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {loginForm.username}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Equity</p>
                <p className="text-2xl font-bold text-gray-900">${portfolioData.totalEquity.toLocaleString()}</p>
              </div>
              <div className="text-green-500 text-2xl">💰</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Day P&L</p>
                <p className={`text-2xl font-bold ${portfolioData.dayPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${portfolioData.dayPnL.toLocaleString()}
                </p>
                <p className={`text-sm ${portfolioData.dayPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {portfolioData.dayPnL >= 0 ? '↗️' : '↘️'} {portfolioData.dayPnLPercent}%
                </p>
              </div>
              <div className="text-blue-500 text-2xl">📈</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cash Balance</p>
                <p className="text-2xl font-bold text-gray-900">${portfolioData.cashBalance.toLocaleString()}</p>
              </div>
              <div className="text-purple-500 text-2xl">💳</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Buying Power</p>
                <p className="text-2xl font-bold text-gray-900">${portfolioData.buyingPower.toLocaleString()}</p>
              </div>
              <div className="text-orange-500 text-2xl">⚡</div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Tabs */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'holdings', label: 'Holdings', icon: '📈' },
                { id: 'performance', label: 'Performance', icon: '🎯' },
                { id: 'allocation', label: 'Allocation', icon: '🥧' },
                { id: 'statements', label: 'Statements', icon: '📄' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Performance Overview</h3>
                  <div className="space-y-3">
                    {Object.entries(portfolioData.performance).map(([period, value]) => (
                      <div key={period} className="flex items-center justify-between">
                        <span className="capitalize text-gray-600">{period.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`font-semibold ${value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {value >= 0 ? '+' : ''}{value}%
                          </span>
                          <span>{value >= 0 ? '↗️' : '↘️'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">🏆 Top Holdings</h3>
                  <div className="space-y-3">
                    {portfolioData.holdings.slice(0, 4).map((holding) => (
                      <div key={holding.symbol} className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">{holding.symbol}</div>
                          <div className="text-sm text-gray-600">{holding.shares} shares</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">${holding.value.toLocaleString()}</div>
                          <div className={`text-sm ${holding.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {holding.pnl >= 0 ? '+' : ''}${holding.pnl.toLocaleString()} ({holding.pnlPercent}%)
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'holdings' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Symbol</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">Shares</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">Price</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">Value</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">P&L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolioData.holdings.map((holding) => (
                      <tr key={holding.symbol} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-gray-900">{holding.symbol}</td>
                        <td className="py-3 px-4 text-gray-700">{holding.name}</td>
                        <td className="py-3 px-4 text-right text-gray-700">{holding.shares}</td>
                        <td className="py-3 px-4 text-right text-gray-700">${holding.price}</td>
                        <td className="py-3 px-4 text-right font-semibold text-gray-900">${holding.value.toLocaleString()}</td>
                        <td className={`py-3 px-4 text-right font-semibold ${holding.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {holding.pnl >= 0 ? '+' : ''}${holding.pnl.toLocaleString()} ({holding.pnlPercent}%)
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Risk Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Beta</span>
                      <span className="font-semibold text-gray-900">{portfolioData.riskMetrics.beta}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Alpha</span>
                      <span className="font-semibold text-green-600">+{portfolioData.riskMetrics.alpha}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sharpe Ratio</span>
                      <span className="font-semibold text-gray-900">{portfolioData.riskMetrics.sharpeRatio}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Standard Deviation</span>
                      <span className="font-semibold text-gray-900">{portfolioData.riskMetrics.standardDeviation}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max Drawdown</span>
                      <span className="font-semibold text-red-600">{portfolioData.riskMetrics.maxDrawdown}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Value at Risk (95%)</span>
                      <span className="font-semibold text-red-600">{portfolioData.riskMetrics.valueAtRisk}%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Return Analysis</h3>
                  <div className="space-y-3">
                    {Object.entries(portfolioData.performance).map(([period, value]) => (
                      <div key={period} className="flex justify-between">
                        <span className="capitalize text-gray-600">{period.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className={`font-semibold ${value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {value >= 0 ? '+' : ''}{value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'allocation' && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">🥧 Portfolio Allocation by Sector</h3>
                <div className="space-y-4">
                  {portfolioData.allocation.sectors.map((sector) => (
                    <div key={sector.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">{sector.name}</span>
                        <span className="font-semibold text-gray-900">{sector.percentage}% (${sector.value.toLocaleString()})</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${sector.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'statements' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📄 Statement Templates</h3>
                  <div className="space-y-3">
                    <button 
                      onClick={() => generateStatement('Comprehensive')}
                      className="w-full p-3 text-left bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">📋</span>
                        <span className="font-medium">Comprehensive Statement</span>
                      </div>
                    </button>
                    <button 
                      onClick={() => generateStatement('Executive Summary')}
                      className="w-full p-3 text-left bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">📊</span>
                        <span className="font-medium">Executive Summary</span>
                      </div>
                    </button>
                    <button 
                      onClick={() => generateStatement('Performance Focus')}
                      className="w-full p-3 text-left bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">📈</span>
                        <span className="font-medium">Performance Focus</span>
                      </div>
                    </button>
                    <button 
                      onClick={() => generateStatement('Holdings Detail')}
                      className="w-full p-3 text-left bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🥧</span>
                        <span className="font-medium">Holdings Detail</span>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📤 Export Options</h3>
                  <div className="space-y-3">
                    <button 
                      onClick={printStatement}
                      className="w-full p-3 text-left bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🖨️</span>
                        <span className="font-medium">Print Statement</span>
                      </div>
                    </button>
                    <button 
                      onClick={() => generateStatement('Download')}
                      className="w-full p-3 text-left bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">💾</span>
                        <span className="font-medium">Download HTML</span>
                      </div>
                    </button>
                    <button 
                      className="w-full p-3 text-left bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🔗</span>
                        <span className="font-medium">Share Securely</span>
                      </div>
                    </button>
                    <button 
                      className="w-full p-3 text-left bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">📧</span>
                        <span className="font-medium">Email Statement</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IBOSSPortfolioTracker;
