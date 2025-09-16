import React, { useState } from 'react';

const AccountOpeningWorkflow = ({ language = 'en', accountType = 'individual', onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [showVideoKYC, setShowVideoKYC] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const translations = {
    en: {
      videoKYC: "Video KYC Verification",
      aiAssistant: "AI Assistant",
      chatAgent: "Chat with Agent",
      scheduleCall: "Schedule Video Call",
      uploadDocs: "Upload Documents",
      reviewApp: "Review Application",
      submitApp: "Submit Application",
      startVideoKYC: "Start Video KYC",
      needHelp: "Need Help?",
      chatNow: "Chat Now",
      callNow: "Call Now",
      videoCallNow: "Video Call Now"
    },
    es: {
      videoKYC: "Verificación KYC por Video",
      aiAssistant: "Asistente IA",
      chatAgent: "Chat con Agente",
      scheduleCall: "Programar Videollamada",
      uploadDocs: "Subir Documentos",
      reviewApp: "Revisar Aplicación",
      submitApp: "Enviar Aplicación",
      startVideoKYC: "Iniciar Video KYC",
      needHelp: "¿Necesita Ayuda?",
      chatNow: "Chat Ahora",
      callNow: "Llamar Ahora",
      videoCallNow: "Videollamada Ahora"
    },
    ar: {
      videoKYC: "التحقق من الهوية بالفيديو",
      aiAssistant: "مساعد ذكي",
      chatAgent: "محادثة مع وكيل",
      scheduleCall: "جدولة مكالمة فيديو",
      uploadDocs: "تحميل المستندات",
      reviewApp: "مراجعة الطلب",
      submitApp: "إرسال الطلب",
      startVideoKYC: "بدء التحقق بالفيديو",
      needHelp: "تحتاج مساعدة؟",
      chatNow: "محادثة الآن",
      callNow: "اتصل الآن",
      videoCallNow: "مكالمة فيديو الآن"
    },
    zh: {
      videoKYC: "视频身份验证",
      aiAssistant: "AI助手",
      chatAgent: "与客服聊天",
      scheduleCall: "安排视频通话",
      uploadDocs: "上传文件",
      reviewApp: "审核申请",
      submitApp: "提交申请",
      startVideoKYC: "开始视频验证",
      needHelp: "需要帮助？",
      chatNow: "立即聊天",
      callNow: "立即通话",
      videoCallNow: "立即视频通话"
    }
  };

  const t = translations[language] || translations.en;

  const workflowSteps = [
    {
      id: 1,
      title: language === 'en' ? 'Application' : language === 'es' ? 'Aplicación' : language === 'ar' ? 'التطبيق' : '申请',
      description: language === 'en' ? 'Complete digital form' : language === 'es' ? 'Completar formulario digital' : language === 'ar' ? 'إكمال النموذج الرقمي' : '完成数字表格',
      icon: '📝'
    },
    {
      id: 2,
      title: language === 'en' ? 'Documentation' : language === 'es' ? 'Documentación' : language === 'ar' ? 'التوثيق' : '文档',
      description: language === 'en' ? 'Upload required documents' : language === 'es' ? 'Subir documentos requeridos' : language === 'ar' ? 'تحميل الوثائق المطلوبة' : '上传所需文件',
      icon: '📄'
    },
    {
      id: 3,
      title: t.videoKYC,
      description: language === 'en' ? 'Video identity verification' : language === 'es' ? 'Verificación de identidad por video' : language === 'ar' ? 'التحقق من الهوية بالفيديو' : '视频身份验证',
      icon: '📹'
    },
    {
      id: 4,
      title: language === 'en' ? 'Review' : language === 'es' ? 'Revisión' : language === 'ar' ? 'المراجعة' : '审查',
      description: language === 'en' ? 'Bank review (2-3 days)' : language === 'es' ? 'Revisión bancaria (2-3 días)' : language === 'ar' ? 'مراجعة البنك (2-3 أيام)' : '银行审查（2-3天）',
      icon: '🔍'
    },
    {
      id: 5,
      title: language === 'en' ? 'Activation' : language === 'es' ? 'Activación' : language === 'ar' ? 'التفعيل' : '激活',
      description: language === 'en' ? 'Account activation' : language === 'es' ? 'Activación de cuenta' : language === 'ar' ? 'تفعيل الحساب' : '账户激活',
      icon: '✅'
    }
  ];

  const VideoKYCModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-red-700 mb-4">{t.videoKYC}</h3>
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center mb-4">
            <div className="text-center">
              <div className="text-6xl mb-4">📹</div>
              <p className="text-gray-600">Video KYC Session</p>
              <p className="text-sm text-gray-500">Secure identity verification</p>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              {t.startVideoKYC}
            </button>
            <button 
              onClick={() => setShowVideoKYC(false)}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AIAssistantModal = () => (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl border-2 border-red-200 w-80 h-96 z-40">
      <div className="bg-red-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h4 className="font-bold">{t.aiAssistant}</h4>
        <button 
          onClick={() => setShowAIAssistant(false)}
          className="text-white hover:text-red-200"
        >
          ×
        </button>
      </div>
      <div className="p-4 h-64 overflow-y-auto">
        <div className="space-y-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm">Hello! I'm your AI assistant. How can I help you with your account opening today?</p>
          </div>
          <div className="bg-red-50 p-3 rounded-lg ml-8">
            <p className="text-sm">I need help with document requirements</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm">For {accountType} accounts, you'll need: passport, proof of address, and income verification. Would you like me to guide you through each step?</p>
          </div>
        </div>
      </div>
      <div className="p-4 border-t">
        <input 
          type="text" 
          placeholder="Type your question..."
          className="w-full p-2 border rounded-lg text-sm"
        />
      </div>
    </div>
  );

  const ChatModal = () => (
    <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-xl border-2 border-blue-200 w-80 h-96 z-40">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h4 className="font-bold">{t.chatAgent}</h4>
        <button 
          onClick={() => setShowChat(false)}
          className="text-white hover:text-blue-200"
        >
          ×
        </button>
      </div>
      <div className="p-4 h-64 overflow-y-auto">
        <div className="space-y-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm"><strong>Agent Sarah:</strong> Welcome to Alhambra Bank! I'm here to help you with your account opening. What questions do you have?</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg ml-8">
            <p className="text-sm">Hi, I'd like to know about the Video KYC process</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm"><strong>Agent Sarah:</strong> Our Video KYC is a secure, convenient way to verify your identity. It takes about 10-15 minutes and can be done from anywhere. Would you like to schedule one now?</p>
          </div>
        </div>
      </div>
      <div className="p-4 border-t">
        <input 
          type="text" 
          placeholder="Type your message..."
          className="w-full p-2 border rounded-lg text-sm"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Workflow Diagram */}
      <div className="mb-8 bg-gray-50 rounded-lg p-6 border-2 border-red-100">
        <h4 className="text-lg font-semibold text-red-700 mb-4">
          📋 Account Opening Workflow ({language === 'en' ? 'English' : language === 'es' ? 'Español' : language === 'ar' ? 'العربية' : '中文'})
        </h4>
        
        {/* Workflow Diagram */}
        <div className="mb-6 text-center">
          <img 
            src="/images/workflow/AX0r36A0vspe.jpg" 
            alt="Digital Bank Client Onboarding Process Flow"
            className="mx-auto max-w-full h-auto rounded-lg shadow-md border border-gray-200"
            style={{ maxHeight: '300px' }}
          />
          <p className="text-sm text-gray-600 mt-2">Digital Banking Onboarding Process</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {workflowSteps.map((step, i) => (
            <div key={i} className={`text-center p-4 rounded-lg border-2 ${currentStep >= step.id ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}>
              <div className={`text-2xl mb-2`}>{step.icon}</div>
              <div className={`text-xl font-bold mb-2 ${currentStep >= step.id ? 'text-red-600' : 'text-gray-400'}`}>{step.id}</div>
              <h5 className={`font-semibold mb-1 ${currentStep >= step.id ? 'text-red-700' : 'text-gray-500'}`}>{step.title}</h5>
              <p className={`text-sm ${currentStep >= step.id ? 'text-red-600' : 'text-gray-400'}`}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <button 
          onClick={() => setShowVideoKYC(true)}
          className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <span className="mr-2">📹</span>
          {t.videoKYC}
        </button>
        
        <button 
          onClick={() => setShowAIAssistant(true)}
          className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <span className="mr-2">🤖</span>
          {t.aiAssistant}
        </button>
        
        <button 
          onClick={() => setShowChat(true)}
          className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <span className="mr-2">💬</span>
          {t.chatAgent}
        </button>
        
        <button 
          onClick={() => alert('Scheduling video call...')}
          className="flex items-center justify-center px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <span className="mr-2">📞</span>
          {t.scheduleCall}
        </button>
      </div>

      {/* Help Section */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <span className="text-2xl mr-2">💡</span>
          <h4 className="font-bold text-yellow-800">{t.needHelp}</h4>
        </div>
        <p className="text-yellow-700 mb-4">Our team is available 24/7 to assist you with your account opening process.</p>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setShowChat(true)}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm"
          >
            {t.chatNow}
          </button>
          <button 
            onClick={() => alert('Calling support...')}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm"
          >
            {t.callNow}
          </button>
          <button 
            onClick={() => setShowVideoKYC(true)}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm"
          >
            {t.videoCallNow}
          </button>
        </div>
      </div>

      {/* Current Step Content */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-red-700 mb-4">
          Step {currentStep}: {workflowSteps[currentStep - 1]?.title}
        </h3>
        <p className="text-gray-600 mb-4">{workflowSteps[currentStep - 1]?.description}</p>
        
        {currentStep === 3 && (
          <div className="text-center">
            <button 
              onClick={() => setShowVideoKYC(true)}
              className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 text-lg font-semibold"
            >
              {t.startVideoKYC}
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {showVideoKYC && <VideoKYCModal />}
      {showAIAssistant && <AIAssistantModal />}
      {showChat && <ChatModal />}
    </div>
  );
};

export default AccountOpeningWorkflow;
