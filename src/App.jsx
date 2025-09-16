import React, { useState, useEffect } from 'react';
import './App.css';
import { individualFormFields, corporateFormFields, formSubmissionInstructions } from './formFields.js';

const AlhambraBankApp = () => {
  // Core state management
  const [currentTab, setCurrentTab] = useState('home');
  const [language, setLanguage] = useState('en');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [accountType, setAccountType] = useState('individual');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  // IBOSS Portfolio Tracker states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [portfolioTab, setPortfolioTab] = useState('overview');
  const [bankCredentials, setBankCredentials] = useState({ username: '', password: '' });
  const [ibossCredentials, setIbossCredentials] = useState({ username: '', password: '' });

  // Slideshow states
  const [currentSlide, setCurrentSlide] = useState(0);
  const [caymanSlide, setCaymanSlide] = useState(0);

  // Alhambra Palace images - Authentic images from Granada, Spain
  const alhambraImages = [
    { src: '/images/alhambra/2ifBxNBK7uoj.jpg', title: 'Court of the Lions' },
    { src: '/images/alhambra/GgvjCNfklBIz.jpg', title: 'Court of the Lions - Detail' },
    { src: '/images/alhambra/BIaA83jfMqEC.jpg', title: 'Palace Courtyard' },
    { src: '/images/alhambra/5x24DQqcgFKU.jpg', title: 'Architectural Marvel' },
    { src: '/images/alhambra/BoDCpkXLqd4X.jpg', title: 'Islamic Architecture' },
    { src: '/images/alhambra/hXRYB0t5qXOn.jpg', title: 'Palace Gardens' },
    { src: '/images/alhambra/8zSX0ZmtLvaE.jpg', title: 'Artistic Details' },
    { src: '/images/alhambra/GH2oInCpezGO.jpeg', title: 'Historical Grandeur' }
  ];

  // Cayman Islands images - Authentic images from Grand Cayman
  const caymanImages = [
    { src: '/images/cayman/QQDNcVkOCLhf.jpg', title: 'Seven Mile Beach Paradise' },
    { src: '/images/cayman/G3wwKTwzXWE9.jpg', title: 'Grand Cayman Beach' },
    { src: '/images/cayman/XOKAmns42iuM.jpg', title: 'Seven Mile Beach' },
    { src: '/images/cayman/uvhjaEVHEcmU.jpg', title: 'Financial District' },
    { src: '/images/cayman/ZwS9Weot45dz.jpg', title: 'Banking Hub' },
    { src: '/images/cayman/tRrXLk1YNwjW.jpg', title: 'Cayman Coastline' }
  ];

  // Auto-advance slideshows
  useEffect(() => {
    const alhambraTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % alhambraImages.length);
    }, 10000); // 10 seconds

    const caymanTimer = setInterval(() => {
      setCaymanSlide((prev) => (prev + 1) % caymanImages.length);
    }, 6000); // 6 seconds for Cayman Islands

    return () => {
      clearInterval(alhambraTimer);
      clearInterval(caymanTimer);
    };
  }, []);

  // Translations
  const translations = {
    en: {
      title: "Alhambra Bank & Trust",
      tagline1: "MANAGING YOUR WEALTH",
      tagline2: "PROTECTING YOUR LEGACY",
      openAccount: "Open Account",
      openIndividual: "👤 Open Individual Account",
      openCorporate: "🏢 Open Corporate Account",
      home: "Home",
      about: "About",
      services: "Services",
      trading: "Trading",
      marketInsights: "Market Insights",
      aiServices: "AI Services",
      portfolioTracker: "Portfolio Tracker",
      blog: "Blog",
      contact: "Contact",
      customerLogin: "Customer Login",
      scheduleCall: "Schedule a Call",
      // Social Media & Communication
      whatsapp: "WhatsApp",
      telegram: "Telegram",
      facebook: "Facebook",
      twitter: "Twitter",
      instagram: "Instagram",
      linkedin: "LinkedIn",
      youtube: "YouTube",
      livechat: "Live Chat",
      videocall: "Video Call",
      phonecall: "Phone Call",
      email: "Email",
      // Portfolio Tracker
      totalEquity: "Total Equity",
      dayPL: "Day P&L",
      cashBalance: "Cash Balance",
      buyingPower: "Buying Power",
      overview: "Overview",
      holdings: "Holdings",
      performance: "Performance",
      allocation: "Allocation",
      statements: "Statements",
      logout: "Logout"
    },
    es: {
      title: "Alhambra Bank & Trust",
      tagline1: "GESTIONANDO SU RIQUEZA",
      tagline2: "PROTEGIENDO SU LEGADO",
      openAccount: "Abrir Cuenta",
      openIndividual: "👤 Abrir Cuenta Individual",
      openCorporate: "🏢 Abrir Cuenta Corporativa",
      home: "Inicio",
      about: "Acerca de",
      services: "Servicios",
      trading: "Trading",
      marketInsights: "Perspectivas del Mercado",
      aiServices: "Servicios IA",
      portfolioTracker: "Rastreador de Cartera",
      blog: "Blog",
      contact: "Contacto",
      customerLogin: "Acceso Cliente",
      scheduleCall: "Programar Llamada",
      // Social Media & Communication
      whatsapp: "WhatsApp",
      telegram: "Telegram",
      facebook: "Facebook",
      twitter: "Twitter",
      instagram: "Instagram",
      linkedin: "LinkedIn",
      youtube: "YouTube",
      livechat: "Chat en Vivo",
      videocall: "Videollamada",
      phonecall: "Llamada",
      email: "Correo",
      // Portfolio Tracker
      totalEquity: "Patrimonio Total",
      dayPL: "P&G del Día",
      cashBalance: "Saldo en Efectivo",
      buyingPower: "Poder de Compra",
      overview: "Resumen",
      holdings: "Tenencias",
      performance: "Rendimiento",
      allocation: "Asignación",
      statements: "Estados",
      logout: "Cerrar Sesión"
    },
    ar: {
      title: "بنك الحمراء والثقة",
      tagline1: "إدارة ثروتكم",
      tagline2: "حماية إرثكم",
      openAccount: "فتح حساب",
      openIndividual: "👤 فتح حساب فردي",
      openCorporate: "🏢 فتح حساب شركة",
      home: "الرئيسية",
      about: "حول",
      services: "الخدمات",
      trading: "التداول",
      marketInsights: "رؤى السوق",
      aiServices: "خدمات الذكاء الاصطناعي",
      portfolioTracker: "متتبع المحفظة",
      blog: "المدونة",
      contact: "اتصل",
      customerLogin: "دخول العميل",
      scheduleCall: "جدولة مكالمة",
      // Social Media & Communication
      whatsapp: "واتساب",
      telegram: "تيليجرام",
      facebook: "فيسبوك",
      twitter: "تويتر",
      instagram: "إنستغرام",
      linkedin: "لينكد إن",
      youtube: "يوتيوب",
      livechat: "دردشة مباشرة",
      videocall: "مكالمة فيديو",
      phonecall: "مكالمة هاتفية",
      email: "بريد إلكتروني",
      // Portfolio Tracker
      totalEquity: "إجمالي الأسهم",
      dayPL: "ربح/خسارة اليوم",
      cashBalance: "الرصيد النقدي",
      buyingPower: "القوة الشرائية",
      overview: "نظرة عامة",
      holdings: "الممتلكات",
      performance: "الأداء",
      allocation: "التوزيع",
      statements: "البيانات",
      logout: "تسجيل الخروج"
    },
    zh: {
      title: "阿尔罕布拉银行信托",
      tagline1: "管理您的财富",
      tagline2: "保护您的遗产",
      openAccount: "开户",
      openIndividual: "👤 开设个人账户",
      openCorporate: "🏢 开设企业账户",
      home: "首页",
      about: "关于",
      services: "服务",
      trading: "交易",
      marketInsights: "市场洞察",
      aiServices: "AI服务",
      portfolioTracker: "投资组合跟踪器",
      blog: "博客",
      contact: "联系",
      customerLogin: "客户登录",
      scheduleCall: "预约通话",
      // Social Media & Communication
      whatsapp: "WhatsApp",
      telegram: "Telegram",
      facebook: "Facebook",
      twitter: "Twitter",
      instagram: "Instagram",
      linkedin: "LinkedIn",
      youtube: "YouTube",
      livechat: "在线聊天",
      videocall: "视频通话",
      phonecall: "电话",
      email: "邮件",
      // Portfolio Tracker
      totalEquity: "总权益",
      dayPL: "日损益",
      cashBalance: "现金余额",
      buyingPower: "购买力",
      overview: "概览",
      holdings: "持仓",
      performance: "表现",
      allocation: "配置",
      statements: "报表",
      logout: "登出"
    }
  };

  const t = translations[language];

  // IBOSS Portfolio Tracker Component
  const IBOSSPortfolioTracker = () => {
    const handleLogin = () => {
      // Simulate authentication
      if (bankCredentials.username && bankCredentials.password && 
          ibossCredentials.username && ibossCredentials.password) {
        setIsLoggedIn(true);
      }
    };

    const handleLogout = () => {
      setIsLoggedIn(false);
      setBankCredentials({ username: '', password: '' });
      setIbossCredentials({ username: '', password: '' });
      setPortfolioTab('overview');
    };

    if (!isLoggedIn) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 py-16">
          <div className="container mx-auto px-4 max-w-md">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="bg-red-600 text-white p-6 text-center">
                <h2 className="text-2xl font-bold">{t.portfolioTracker}</h2>
                <p className="mt-2">Access your trading portfolio and analytics</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Username</label>
                  <input
                    type="text"
                    value={bankCredentials.username}
                    onChange={(e) => setBankCredentials({...bankCredentials, username: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter your bank username"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={bankCredentials.password}
                      onChange={(e) => setBankCredentials({...bankCredentials, password: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter your bank password"
                    />
                    <button className="absolute right-3 top-3 text-gray-400">🔒</button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">IBOSS Trading Username</label>
                  <input
                    type="text"
                    value={ibossCredentials.username}
                    onChange={(e) => setIbossCredentials({...ibossCredentials, username: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Your IBOSS trading username"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">IBOSS Trading Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={ibossCredentials.password}
                      onChange={(e) => setIbossCredentials({...ibossCredentials, password: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Your IBOSS trading password"
                    />
                    <button className="absolute right-3 top-3 text-gray-400">🔒</button>
                  </div>
                </div>
                
                <button
                  onClick={handleLogin}
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  🔐 Secure Login
                </button>
                
                <div className="text-center text-sm text-gray-500 mt-4">
                  Demo: bank_user / bank_pass / iboss_user / iboss_pass
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
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src="/alhambra-logo.png" alt="Alhambra Bank" className="h-8" />
              <span className="text-lg font-semibold text-red-700">Welcome back, {bankCredentials.username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              🚪 {t.logout}
            </button>
          </div>
        </div>

        {/* Portfolio Metrics */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t.totalEquity}</p>
                  <p className="text-2xl font-bold text-gray-900">$125,750.50</p>
                </div>
                <div className="text-2xl">💰</div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t.dayPL}</p>
                  <p className="text-2xl font-bold text-green-600">$2,150.25</p>
                  <p className="text-sm text-green-600">↗ 1.74%</p>
                </div>
                <div className="text-2xl">📈</div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t.cashBalance}</p>
                  <p className="text-2xl font-bold text-gray-900">$15,250.75</p>
                </div>
                <div className="text-2xl">💵</div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t.buyingPower}</p>
                  <p className="text-2xl font-bold text-gray-900">$45,000</p>
                </div>
                <div className="text-2xl">⚡</div>
              </div>
            </div>
          </div>

          {/* Portfolio Tabs */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'overview', label: `📊 ${t.overview}`, icon: '📊' },
                  { id: 'holdings', label: `📈 ${t.holdings}`, icon: '📈' },
                  { id: 'performance', label: `🎯 ${t.performance}`, icon: '🎯' },
                  { id: 'allocation', label: `🥧 ${t.allocation}`, icon: '🥧' },
                  { id: 'statements', label: `📄 ${t.statements}`, icon: '📄' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setPortfolioTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm ${
                      portfolioTab === tab.id
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {portfolioTab === 'overview' && (
                <div className="space-y-6">
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center">
                      🖨️ Print Portfolio
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                      💾 Download PDF
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                      🔗 Share Portfolio
                    </button>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
                      📧 Email Statement
                    </button>
                  </div>

                  {/* Performance Chart */}
                  <div className="bg-white p-6 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-4">📊 Portfolio Performance Chart</h3>
                    <div className="h-64 bg-gradient-to-r from-red-50 to-red-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                      {/* Simulated Chart */}
                      <svg className="w-full h-full" viewBox="0 0 400 200">
                        <defs>
                          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.1"/>
                          </linearGradient>
                        </defs>
                        {/* Chart line */}
                        <polyline
                          fill="none"
                          stroke="#dc2626"
                          strokeWidth="3"
                          points="20,150 60,140 100,120 140,110 180,100 220,90 260,85 300,80 340,75 380,70"
                        />
                        {/* Chart area */}
                        <polygon
                          fill="url(#chartGradient)"
                          points="20,150 60,140 100,120 140,110 180,100 220,90 260,85 300,80 340,75 380,70 380,180 20,180"
                        />
                        {/* Data points */}
                        {[20,60,100,140,180,220,260,300,340,380].map((x, i) => (
                          <circle key={i} cx={x} cy={150-i*8} r="4" fill="#dc2626" className="animate-pulse"/>
                        ))}
                      </svg>
                      <div className="absolute top-4 right-4 text-sm text-gray-600">
                        📈 +15.8% YTD
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">📈 Performance Overview</h3>
                      <div className="space-y-3">
                        {[
                          { period: 'Daily', value: '+1.74%', amount: '+$2,150.25', color: 'text-green-600' },
                          { period: 'Weekly', value: '+3.8%', amount: '+$4,725.50', color: 'text-green-600' },
                          { period: 'Monthly', value: '+5.2%', amount: '+$6,425.75', color: 'text-green-600' },
                          { period: 'Quarterly', value: '+8.7%', amount: '+$10,875.25', color: 'text-green-600' },
                          { period: 'Yearly', value: '+15.8%', amount: '+$19,650.50', color: 'text-green-600' },
                          { period: 'Three Year', value: '+42.5%', amount: '+$52,875.75', color: 'text-green-600' },
                          { period: 'Five Year', value: '+85.2%', amount: '+$106,250.25', color: 'text-green-600' }
                        ].map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-600 font-medium">{item.period}</span>
                            <div className="text-right">
                              <div className={`font-semibold ${item.color}`}>{item.value} ↗️</div>
                              <div className="text-sm text-gray-500">{item.amount}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">🏆 Top Holdings</h3>
                      <div className="space-y-3">
                        {[
                          { symbol: 'AAPL', shares: '150 shares', value: '$26,325', change: '+$1,250.75 (+4.98%)', color: 'text-green-600' },
                          { symbol: 'GOOGL', shares: '75 shares', value: '$10,672.5', change: '-$325.25 (-2.95%)', color: 'text-red-600' },
                          { symbol: 'MSFT', shares: '200 shares', value: '$75,770', change: '+$2,150.50 (+2.92%)', color: 'text-green-600' },
                          { symbol: 'TSLA', shares: '50 shares', value: '$12,437.5', change: '-$485.75 (-3.76%)', color: 'text-red-600' }
                        ].map((holding, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-semibold text-gray-900">{holding.symbol}</div>
                                <div className="text-sm text-gray-600">{holding.shares}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-gray-900">{holding.value}</div>
                                <div className={`text-sm ${holding.color}`}>{holding.change}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {portfolioTab === 'statements' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">📄 Customer Statements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-4">📋 Statement Templates</h4>
                      <div className="space-y-3">
                        {[
                          { name: 'Comprehensive Statement', icon: '📋' },
                          { name: 'Executive Summary', icon: '📊' },
                          { name: 'Performance Focus', icon: '📈' },
                          { name: 'Holdings Detail', icon: '🥧' }
                        ].map((template, index) => (
                          <button
                            key={index}
                            className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <span className="mr-2">{template.icon}</span>
                            {template.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-4">🚀 Export Options</h4>
                      <div className="space-y-3">
                        {[
                          { name: 'Print Statement', icon: '🖨️' },
                          { name: 'Download HTML', icon: '💾' },
                          { name: 'Share Securely', icon: '🔗' },
                          { name: 'Email Statement', icon: '📧' }
                        ].map((option, index) => (
                          <button
                            key={index}
                            className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <span className="mr-2">{option.icon}</span>
                            {option.name}
                          </button>
                        ))}
                      </div>
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

  // Social Media & Communication Component
  const SocialMediaBar = () => (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
      <div className="bg-white rounded-lg shadow-lg p-2 space-y-2">
        {[
          { name: t.whatsapp, icon: '💬', color: 'bg-green-500', link: 'https://wa.me/13451234567' },
          { name: t.telegram, icon: '✈️', color: 'bg-blue-500', link: 'https://t.me/alhambrabank' },
          { name: t.facebook, icon: '📘', color: 'bg-blue-600', link: 'https://facebook.com/alhambrabank' },
          { name: t.twitter, icon: '🐦', color: 'bg-blue-400', link: 'https://twitter.com/alhambrabank' },
          { name: t.instagram, icon: '📷', color: 'bg-pink-500', link: 'https://instagram.com/alhambrabank' },
          { name: t.linkedin, icon: '💼', color: 'bg-blue-700', link: 'https://linkedin.com/company/alhambrabank' },
          { name: t.youtube, icon: '📺', color: 'bg-red-600', link: 'https://youtube.com/alhambrabank' },
          { name: t.livechat, icon: '💭', color: 'bg-purple-500', link: '#' },
          { name: t.videocall, icon: '📹', color: 'bg-indigo-500', link: '#' },
          { name: t.phonecall, icon: '📞', color: 'bg-green-600', link: 'tel:+13451234567' },
          { name: t.email, icon: '📧', color: 'bg-gray-600', link: 'mailto:info@alhambrabank.ky' }
        ].map((social, index) => (
          <a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-12 h-12 ${social.color} text-white rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 group relative`}
            title={social.name}
          >
            <span className="text-lg">{social.icon}</span>
            <div className="absolute right-14 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {social.name}
            </div>
          </a>
        ))}
      </div>
    </div>
  );

  // Communication Channels Component
  const CommunicationChannels = () => (
    <div className="bg-red-50 py-8">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-red-700 text-center mb-8">Connect With Us</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[
            { name: t.whatsapp, icon: '💬', color: 'bg-green-500', link: 'https://wa.me/13451234567' },
            { name: t.telegram, icon: '✈️', color: 'bg-blue-500', link: 'https://t.me/alhambrabank' },
            { name: 'Facebook', icon: '📘', color: 'bg-blue-600', link: 'https://facebook.com/alhambrabank' },
            { name: 'Twitter', icon: '🐦', color: 'bg-blue-400', link: 'https://twitter.com/alhambrabank' },
            { name: 'Instagram', icon: '📷', color: 'bg-pink-500', link: 'https://instagram.com/alhambrabank' },
            { name: 'LinkedIn', icon: '💼', color: 'bg-blue-700', link: 'https://linkedin.com/company/alhambrabank' },
            { name: 'YouTube', icon: '📺', color: 'bg-red-600', link: 'https://youtube.com/alhambrabank' },
            { name: t.livechat, icon: '💭', color: 'bg-purple-500', link: '#' },
            { name: t.videocall, icon: '📹', color: 'bg-indigo-500', link: '#' },
            { name: t.phonecall, icon: '📞', color: 'bg-green-600', link: 'tel:+13451234567' },
            { name: t.email, icon: '📧', color: 'bg-gray-600', link: 'mailto:info@alhambrabank.ky' }
          ].map((channel, index) => (
            <a 
              key={index} 
              href={channel.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center group"
            >
              <div className={`w-16 h-16 ${channel.color} text-white rounded-full flex items-center justify-center mx-auto mb-2 hover:scale-110 transition-transform cursor-pointer group-hover:shadow-lg`}>
                <span className="text-2xl">{channel.icon}</span>
              </div>
              <p className="text-sm text-gray-700 font-medium group-hover:text-red-700 transition-colors">{channel.name}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  // Alhambra Slideshow Component
  const AlhambraSlideshow = () => (
    <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
      {alhambraImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image.src}
            alt={image.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h3 className="text-white text-xl font-bold">{image.title}</h3>
          </div>
        </div>
      ))}
      
      {/* Slideshow indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {alhambraImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );

  // Cayman Islands Slideshow Component
  const CaymanSlideshow = () => (
    <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
      {caymanImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === caymanSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image.src}
            alt={image.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h4 className="text-white text-lg font-semibold">{image.title}</h4>
          </div>
        </div>
      ))}
    </div>
  );

  // Form handling functions
  const getCurrentFields = () => {
    return accountType === 'individual' ? individualFormFields : corporateFormFields;
  };

  const getCurrentSteps = () => {
    const fields = getCurrentFields();
    const steps = [];
    let currentStepFields = [];
    
    fields.forEach(field => {
      if (field.step !== (steps.length + 1)) {
        if (currentStepFields.length > 0) {
          steps.push(currentStepFields);
        }
        currentStepFields = [field];
      } else {
        currentStepFields.push(field);
      }
    });
    
    if (currentStepFields.length > 0) {
      steps.push(currentStepFields);
    }
    
    return steps;
  };

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleNextStep = () => {
    const totalSteps = getCurrentSteps().length;
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form
      console.log('Form submitted:', formData);
      alert('Application submitted successfully!');
      setShowOnboarding(false);
      setCurrentStep(1);
      setFormData({});
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderFormField = (field) => {
    const value = formData[field.name] || '';
    
    switch (field.type) {
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500"
            required={field.required}
          >
            <option value="">Select {field.label}</option>
            {field.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 h-24 resize-none"
            required={field.required}
          />
        );
      case 'file':
        return (
          <input
            type="file"
            onChange={(e) => handleInputChange(field.name, e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500"
            accept={field.accept}
            required={field.required}
          />
        );
      default:
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500"
            required={field.required}
          />
        );
    }
  };

  const renderOnboardingStep = () => {
    const steps = getCurrentSteps();
    const currentStepFields = steps[currentStep - 1] || [];
    
    if (currentStep === steps.length + 1) {
      // Final step - show instructions
      return (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-red-700">Application Complete</h3>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">Next Steps:</h4>
            <div className="space-y-2 text-red-700">
              {formSubmissionInstructions.map((instruction, index) => (
                <p key={index} className="flex items-start">
                  <span className="font-bold mr-2">{index + 1}.</span>
                  <span>{instruction}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-red-700">
          Step {currentStep}: {currentStepFields[0]?.step_title || 'Form Details'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentStepFields.map((field, index) => (
            <div key={index} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              {renderFormField(field)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Page rendering functions
  const renderHome = () => (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-red-50 to-red-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold text-red-700 mb-4">
                {t.tagline1}
              </h1>
              <h2 className="text-3xl font-semibold text-red-600 mb-6">
                {t.tagline2}
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Our mission is to build a borderless financial system that guarantees sovereignty, 
                fosters inclusion, and protects and empowers every wealth journey.
              </p>
              
              {/* Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => setShowOnboarding(true)}
                  className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-lg font-semibold shadow-lg"
                >
                  {t.openAccount}
                </button>
                <button 
                  onClick={() => setCurrentTab('contact')}
                  className="px-8 py-4 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors text-lg font-semibold"
                >
                  {t.scheduleCall}
                </button>
              </div>
            </div>
            
            <div className="flex justify-center">
              {/* Alhambra Palace Slideshow */}
              <AlhambraSlideshow />
            </div>
          </div>
        </div>
      </div>

      {/* Communication Channels */}
      <CommunicationChannels />

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-red-700 text-center mb-12">Why Alhambra Bank & Trust</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🏛️", title: "Regulatory Excellence", desc: "Fully licensed and regulated by CIMA" },
              { icon: "🌍", title: "Global Reach", desc: "Serving clients worldwide with local expertise" },
              { icon: "🔒", title: "Privacy & Security", desc: "Bank-grade security and confidentiality" },
              { icon: "🤖", title: "AI-Enhanced Banking", desc: "Cutting-edge technology for modern banking" }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-500">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-red-700 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cayman Islands Section */}
      <div className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-red-700 mb-6">Banking in Paradise</h2>
              <p className="text-lg text-gray-700 mb-6">
                Located in the prestigious Cayman Islands, we offer world-class banking services 
                in one of the world's most respected financial centers. Our strategic location 
                provides unparalleled access to global markets while maintaining the highest 
                standards of financial privacy and regulatory compliance.
              </p>
              <div className="space-y-4">
                {[
                  "Zero corporate and personal income tax",
                  "Political and economic stability",
                  "Strong regulatory framework",
                  "English common law jurisdiction",
                  "No exchange controls"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <CaymanSlideshow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-red-700 text-center mb-12">About Alhambra Bank & Trust</h1>
        
        {/* Heritage Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-red-700 mb-6">Our Heritage</h2>
            <p className="text-lg text-gray-700 mb-6">
              Named after the magnificent Alhambra Palace in Granada, Spain, our bank embodies 
              the same principles of architectural excellence, cultural sophistication, and 
              enduring legacy that have made the Alhambra a wonder of the world.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Just as the Alhambra represents the pinnacle of Islamic art and architecture, 
              Alhambra Bank & Trust represents the pinnacle of private banking excellence 
              in the Cayman Islands.
            </p>
          </div>
          <div>
            <AlhambraSlideshow />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-red-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-red-700 mb-4">Our Mission</h3>
            <p className="text-gray-700">
              To provide exceptional private banking services that preserve and enhance our clients' 
              wealth while maintaining the highest standards of confidentiality, integrity, and 
              regulatory compliance.
            </p>
          </div>
          <div className="bg-red-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-red-700 mb-4">Our Vision</h3>
            <p className="text-gray-700">
              To be the premier private bank in the Cayman Islands, recognized for our unwavering 
              commitment to client service, financial innovation, and the preservation of 
              generational wealth.
            </p>
          </div>
        </div>

        {/* Leadership */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-red-700 mb-8">Leadership</h2>
          <div className="max-w-md mx-auto">
            <div className="bg-white border-2 border-red-200 rounded-lg p-6 shadow-lg">
              <img 
                src="/ali-alsari-founder.png" 
                alt="Ali Al-Sari, Founder & CEO" 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-red-700 mb-2">Ali Al-Sari</h3>
              <p className="text-red-600 font-semibold mb-3">Founder & Chief Executive Officer</p>
              <p className="text-gray-700 text-sm">
                With over 25 years of experience in international banking and wealth management, 
                Ali Al-Sari founded Alhambra Bank & Trust to provide unparalleled private banking 
                services in the Cayman Islands.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-2xl font-bold text-red-700 text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🛡️",
                title: "Integrity",
                description: "We conduct our business with the highest ethical standards and transparency."
              },
              {
                icon: "🤝",
                title: "Trust",
                description: "We build lasting relationships based on mutual respect and confidentiality."
              },
              {
                icon: "🎯",
                title: "Excellence",
                description: "We strive for perfection in every aspect of our service delivery."
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-6 bg-red-50 rounded-lg">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-red-700 mb-3">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-red-700 text-center mb-12">Our Services</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[
            {
              title: "Private Banking",
              icon: "🏛️",
              description: "Comprehensive wealth management solutions tailored to high-net-worth individuals and families.",
              features: [
                "Personalized relationship management",
                "Investment advisory services",
                "Estate planning and trust services",
                "Multi-currency accounts",
                "Credit facilities and lending"
              ]
            },
            {
              title: "Corporate Banking",
              icon: "🏢",
              description: "Sophisticated banking solutions for corporations, funds, and institutional clients.",
              features: [
                "Corporate account opening",
                "Trade finance and letters of credit",
                "Cash management solutions",
                "Foreign exchange services",
                "Custody and safekeeping"
              ]
            },
            {
              title: "Investment Management",
              icon: "📈",
              description: "Professional investment management services to grow and preserve your wealth.",
              features: [
                "Portfolio management",
                "Alternative investments",
                "Structured products",
                "Risk management",
                "Performance reporting"
              ]
            },
            {
              title: "Trust & Fiduciary",
              icon: "🛡️",
              description: "Comprehensive trust and fiduciary services for wealth preservation and succession planning.",
              features: [
                "Trust administration",
                "Estate planning",
                "Succession planning",
                "Family office services",
                "Philanthropic advisory"
              ]
            }
          ].map((service, index) => (
            <div key={index} className="bg-red-50 border-2 border-red-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4">{service.icon}</span>
                <h2 className="text-2xl font-bold text-red-700">{service.title}</h2>
              </div>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setCurrentTab('contact')}
                className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTrading = () => (
    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-red-700 text-center mb-12">Trading Services</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {[
            {
              title: "Equity Trading",
              icon: "📊",
              description: "Access global equity markets with competitive pricing and expert execution.",
              features: ["Global stock exchanges", "Real-time market data", "Advanced order types", "Research and analysis"]
            },
            {
              title: "Fixed Income",
              icon: "📈",
              description: "Comprehensive bond trading across government, corporate, and municipal securities.",
              features: ["Government bonds", "Corporate bonds", "Municipal bonds", "Yield optimization"]
            },
            {
              title: "Foreign Exchange",
              icon: "💱",
              description: "Professional FX trading services with competitive spreads and expert guidance.",
              features: ["Major currency pairs", "Exotic currencies", "Hedging strategies", "24/7 trading"]
            }
          ].map((service, index) => (
            <div key={index} className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-red-700 mb-3">{service.title}</h3>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <ul className="text-left space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Ready to Start Trading?</h2>
          <p className="text-gray-700 mb-6">
            Open a trading account today and gain access to global markets with the support of our experienced team.
          </p>
          <button 
            onClick={() => setShowOnboarding(true)}
            className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            Open Trading Account
          </button>
        </div>
      </div>
    </div>
  );

  const renderMarketInsights = () => (
    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-red-700 text-center mb-12">Market Insights</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-700 mb-4">Daily Market Update</h2>
            <div className="space-y-4">
              {[
                { market: "S&P 500", value: "4,567.89", change: "+1.2%", color: "text-green-600" },
                { market: "NASDAQ", value: "14,234.56", change: "+0.8%", color: "text-green-600" },
                { market: "DOW JONES", value: "35,678.90", change: "-0.3%", color: "text-red-600" },
                { market: "FTSE 100", value: "7,456.78", change: "+0.5%", color: "text-green-600" }
              ].map((market, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-red-200">
                  <span className="font-semibold text-gray-700">{market.market}</span>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{market.value}</div>
                    <div className={`text-sm ${market.color}`}>{market.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-700 mb-4">Economic Calendar</h2>
            <div className="space-y-4">
              {[
                { date: "Today", event: "Federal Reserve Meeting", impact: "High" },
                { date: "Tomorrow", event: "GDP Release", impact: "Medium" },
                { date: "Friday", event: "Employment Data", impact: "High" },
                { date: "Next Week", event: "Inflation Report", impact: "Medium" }
              ].map((event, index) => (
                <div key={index} className="border-b border-red-200 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-700">{event.event}</div>
                      <div className="text-sm text-gray-600">{event.date}</div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      event.impact === 'High' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
                    }`}>
                      {event.impact}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Weekly Research Report",
              description: "In-depth analysis of market trends and investment opportunities.",
              date: "Published Weekly"
            },
            {
              title: "Monthly Outlook",
              description: "Comprehensive market outlook and strategic recommendations.",
              date: "Published Monthly"
            },
            {
              title: "Quarterly Review",
              description: "Detailed performance review and forward-looking analysis.",
              date: "Published Quarterly"
            }
          ].map((report, index) => (
            <div key={index} className="bg-white border-2 border-red-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-red-700 mb-3">{report.title}</h3>
              <p className="text-gray-700 mb-4">{report.description}</p>
              <div className="text-sm text-red-600 font-semibold">{report.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAIServices = () => (
    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-red-700 text-center mb-12">AI-Powered Banking Services</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {[
            {
              title: "AI Portfolio Optimization",
              icon: "🤖",
              description: "Advanced machine learning algorithms optimize your investment portfolio for maximum returns while managing risk.",
              features: [
                "Real-time portfolio rebalancing",
                "Risk-adjusted return optimization",
                "Market sentiment analysis",
                "Predictive analytics"
              ]
            },
            {
              title: "Intelligent Wealth Planning",
              icon: "🧠",
              description: "AI-driven wealth planning that adapts to your changing financial goals and market conditions.",
              features: [
                "Goal-based financial planning",
                "Tax optimization strategies",
                "Retirement planning",
                "Estate planning assistance"
              ]
            },
            {
              title: "Smart Risk Management",
              icon: "🛡️",
              description: "Proactive risk management using AI to identify and mitigate potential threats to your wealth.",
              features: [
                "Real-time risk monitoring",
                "Stress testing scenarios",
                "Correlation analysis",
                "Automated alerts"
              ]
            },
            {
              title: "Digital Assistant",
              icon: "💬",
              description: "24/7 AI-powered banking assistant for instant support and account management.",
              features: [
                "Natural language processing",
                "Account inquiries",
                "Transaction support",
                "Investment guidance"
              ]
            }
          ].map((service, index) => (
            <div key={index} className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4">{service.icon}</span>
                <h2 className="text-xl font-bold text-red-700">{service.title}</h2>
              </div>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Experience the Future of Banking</h2>
          <p className="text-lg mb-6">
            Discover how our AI-powered services can transform your banking experience and optimize your wealth management strategy.
          </p>
          <button 
            onClick={() => setCurrentTab('contact')}
            className="px-8 py-3 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Schedule AI Consultation
          </button>
        </div>
      </div>
    </div>
  );

  const renderBlog = () => (
    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-red-700 text-center mb-12">Banking Insights & News</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "The Future of Private Banking in the Caribbean",
              excerpt: "Exploring emerging trends and opportunities in Caribbean financial services.",
              date: "March 15, 2025",
              category: "Industry Insights",
              readTime: "5 min read"
            },
            {
              title: "Wealth Preservation Strategies for 2025",
              excerpt: "Key strategies for protecting and growing wealth in uncertain economic times.",
              date: "March 10, 2025",
              category: "Wealth Management",
              readTime: "7 min read"
            },
            {
              title: "Cayman Islands: A Premier Financial Hub",
              excerpt: "Understanding the advantages of banking in the Cayman Islands jurisdiction.",
              date: "March 5, 2025",
              category: "Jurisdiction Focus",
              readTime: "6 min read"
            },
            {
              title: "Digital Transformation in Private Banking",
              excerpt: "How technology is reshaping the private banking landscape.",
              date: "February 28, 2025",
              category: "Technology",
              readTime: "4 min read"
            },
            {
              title: "ESG Investing: Sustainable Wealth Creation",
              excerpt: "The growing importance of environmental, social, and governance factors in investment decisions.",
              date: "February 25, 2025",
              category: "Investment Strategy",
              readTime: "8 min read"
            },
            {
              title: "Cross-Border Banking Regulations Update",
              excerpt: "Latest developments in international banking compliance and regulations.",
              date: "February 20, 2025",
              category: "Regulatory",
              readTime: "6 min read"
            }
          ].map((article, index) => (
            <div key={index} className="bg-white border-2 border-red-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">{article.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-red-700 mb-3">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{article.date}</span>
                  <button className="text-red-600 hover:text-red-700 font-semibold text-sm">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors font-semibold">
            View All Articles
          </button>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-red-700 text-center mb-12">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-red-700 mb-6">Get in Touch</h2>
            <div className="space-y-6">
              {[
                {
                  icon: "📍",
                  title: "Address",
                  info: "Alhambra Bank & Trust\nGovernors Square, 23 Lime Tree Bay Ave\nGrand Cayman KY1-1205, Cayman Islands"
                },
                {
                  icon: "📞",
                  title: "Phone",
                  info: "+1 (345) 949-7777"
                },
                {
                  icon: "📧",
                  title: "Email",
                  info: "info@alhambrabank.ky"
                },
                {
                  icon: "🕒",
                  title: "Business Hours",
                  info: "Monday - Friday: 9:00 AM - 5:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed"
                }
              ].map((contact, index) => (
                <div key={index} className="bg-white border-2 border-red-200 text-red-800 shadow-lg hover:shadow-xl transition-shadow p-4 rounded-lg">
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">{contact.icon}</span>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{contact.title}</h3>
                      <p className="whitespace-pre-line">{contact.info}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-red-700 mb-4">Connect With Us</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: t.whatsapp, icon: '💬', color: 'bg-green-500' },
                  { name: t.telegram, icon: '✈️', color: 'bg-blue-500' },
                  { name: t.facebook, icon: '📘', color: 'bg-blue-600' },
                  { name: t.twitter, icon: '🐦', color: 'bg-blue-400' },
                  { name: t.instagram, icon: '📷', color: 'bg-pink-500' },
                  { name: t.linkedin, icon: '💼', color: 'bg-blue-700' }
                ].map((social, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-12 h-12 ${social.color} text-white rounded-lg flex items-center justify-center mx-auto mb-2 hover:scale-110 transition-transform cursor-pointer`}>
                      <span className="text-xl">{social.icon}</span>
                    </div>
                    <p className="text-xs text-gray-600">{social.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-red-700 mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500">
                <option value="">Select Inquiry Type</option>
                <option value="account">Account Opening</option>
                <option value="services">Banking Services</option>
                <option value="support">Customer Support</option>
                <option value="other">Other</option>
              </select>
              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  // Main content renderer
  const renderContent = () => {
    switch (currentTab) {
      case 'home': return renderHome();
      case 'about': return renderAbout();
      case 'services': return renderServices();
      case 'trading': return renderTrading();
      case 'marketInsights': return renderMarketInsights();
      case 'aiServices': return renderAIServices();
      case 'portfolioTracker': return <IBOSSPortfolioTracker />;
      case 'blog': return renderBlog();
      case 'contact': return renderContact();
      default: return renderHome();
    }
  };

  // Navigation tabs
  const tabs = [
    { id: 'home', label: t.home },
    { id: 'about', label: t.about },
    { id: 'services', label: t.services },
    { id: 'trading', label: t.trading },
    { id: 'marketInsights', label: t.marketInsights },
    { id: 'aiServices', label: t.aiServices },
    { id: 'portfolioTracker', label: t.portfolioTracker },
    { id: 'blog', label: t.blog },
    { id: 'contact', label: t.contact }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Social Media Bar - Moved to Contact Us section */}
      {/* <SocialMediaBar /> */}

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/alhambra-logo.png" alt="Alhambra Bank & Trust" className="h-10 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-red-700">{t.title}</h1>
                <p className="text-xs text-red-600">Excellence in Corporate Banking</p>
              </div>
            </div>

            {/* Language Selector */}
            <div className="flex items-center space-x-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border border-red-300 rounded px-2 py-1 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
              >
                <option value="en">🇺🇸 English</option>
                <option value="es">🇪🇸 Español</option>
                <option value="ar">🇸🇦 العربية</option>
                <option value="zh">🇨🇳 中文</option>
              </select>

              {/* Account Opening Dropdown */}
              <div className="relative group">
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                  {t.openAccount} ▼
                </button>
                <div className="absolute right-0 mt-2 w-64 bg-white border-2 border-red-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <button
                    onClick={() => {
                      setAccountType('individual');
                      setShowOnboarding(true);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-red-50 transition-colors border-b border-red-100"
                  >
                    {t.openIndividual}
                  </button>
                  <button
                    onClick={() => {
                      setAccountType('corporate');
                      setShowOnboarding(true);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-red-50 transition-colors"
                  >
                    {t.openCorporate}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="border-t border-red-200">
            <div className="flex space-x-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors ${
                    currentTab === tab.id
                      ? 'bg-red-600 text-white'
                      : 'text-red-700 hover:bg-red-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <button className="px-4 py-3 font-medium text-sm whitespace-nowrap bg-red-700 text-white hover:bg-red-800 transition-colors">
                {t.customerLogin}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Account Opening Modal */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-red-600 text-white p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">
                  {accountType === 'individual' ? t.openIndividual : t.openCorporate}
                </h2>
                <p className="text-red-100">Complete your application in a few simple steps</p>
              </div>
              <button
                onClick={() => {
                  setShowOnboarding(false);
                  setCurrentStep(1);
                  setFormData({});
                }}
                className="text-white hover:text-red-200 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                {getCurrentSteps().map((_, i) => (
                  <div key={i} className={`flex items-center ${i < getCurrentSteps().length - 1 ? 'flex-1' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      currentStep > i + 1 ? 'bg-green-600 text-white' : 
                      currentStep === i + 1 ? 'bg-red-600 text-white' : 
                      'bg-gray-300 text-gray-600'
                    }`}>
                      {i + 1}
                    </div>
                    {i < getCurrentSteps().length - 1 && (
                      <div className={`flex-1 h-1 mx-2 ${
                        currentStep > i + 1 ? 'bg-green-600' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center text-gray-600">
                Step {currentStep} of {getCurrentSteps().length}
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {renderOnboardingStep()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between p-6 border-t border-gray-200">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium ${
                  currentStep === 1 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                } transition-all duration-300`}
              >
                Previous
              </button>
              
              <button
                onClick={handleNextStep}
                className="px-6 py-3 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition-all duration-300"
              >
                {currentStep === getCurrentSteps().length ? 'Submit Application' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-20 bg-white min-h-screen">
        {renderContent()}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-red-200 text-red-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">© 2025 {t.title}. All Rights Reserved to alhambrabank.ky</p>
          <p className="text-red-600">Excellence in Corporate Banking | Cayman Islands</p>
        </div>
      </footer>
    </div>
  );
};

export default AlhambraBankApp;
