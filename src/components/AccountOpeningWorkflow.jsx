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

  const generatePrintableForm = (formType) => {
    const formHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Alhambra Bank & Trust - ${formType} Application Form</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #D12727; padding-bottom: 20px; }
          .logo { max-height: 80px; margin-bottom: 10px; }
          .bank-info { color: #666; margin-bottom: 10px; }
          .form-section { margin: 20px 0; page-break-inside: avoid; }
          .form-title { color: #D12727; font-size: 18px; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #D12727; padding-bottom: 5px; }
          .form-field { margin: 15px 0; display: flex; align-items: center; }
          .form-label { width: 200px; font-weight: bold; }
          .form-input { border-bottom: 1px solid #333; min-width: 300px; height: 20px; margin-left: 10px; }
          .checkbox-field { margin: 10px 0; }
          .signature-section { margin-top: 40px; }
          .signature-line { border-bottom: 1px solid #333; width: 300px; height: 30px; margin: 20px 0; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc; font-size: 12px; color: #666; }
          @media print { body { margin: 0; } .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="/alhambra-bank-logo.png" alt="Alhambra Bank & Trust Limited" class="logo" />
          <h1 style="color: #D12727; margin: 10px 0;">Alhambra Bank & Trust Limited</h1>
          <div class="bank-info">
            <p>Governors Square, 23 Lime Tree Bay Ave</p>
            <p>Grand Cayman KY1-1205, Cayman Islands</p>
            <p>Licensed by CIMA | Regulated Financial Institution</p>
          </div>
          <h2>${formType} Account Application Form</h2>
        </div>
        
        <div class="form-section">
          <div class="form-title">Personal Information</div>
          <div class="form-field">
            <span class="form-label">Full Legal Name:</span>
            <div class="form-input"></div>
          </div>
          <div class="form-field">
            <span class="form-label">Date of Birth:</span>
            <div class="form-input"></div>
          </div>
          <div class="form-field">
            <span class="form-label">Nationality:</span>
            <div class="form-input"></div>
          </div>
          <div class="form-field">
            <span class="form-label">Passport Number:</span>
            <div class="form-input"></div>
          </div>
          <div class="form-field">
            <span class="form-label">Phone Number:</span>
            <div class="form-input"></div>
          </div>
          <div class="form-field">
            <span class="form-label">Email Address:</span>
            <div class="form-input"></div>
          </div>
        </div>

        <div class="form-section">
          <div class="form-title">Address Information</div>
          <div class="form-field">
            <span class="form-label">Residential Address:</span>
            <div class="form-input"></div>
          </div>
          <div class="form-field">
            <span class="form-label">City:</span>
            <div class="form-input"></div>
          </div>
          <div class="form-field">
            <span class="form-label">Country:</span>
            <div class="form-input"></div>
          </div>
          <div class="form-field">
            <span class="form-label">Postal Code:</span>
            <div class="form-input"></div>
          </div>
        </div>

        ${formType === 'Individual' ? `
        <div class="form-section">
          <div class="form-title">Employment Information</div>
          <div class="form-field">
            <span class="form-label">Occupation:</span>
            <div class="form-input"></div>
          </div>
          <div class="form-field">
            <span class="form-label">Employer Name:</span>
            <div class="form-input"></div>
          </div>
          <div class="form-field">
            <span class="form-label">Annual Income:</span>
            <div class="form-input"></div>
          </div>
          <div class="form-field">
            <span class="form-label">Source of Funds:</span>
            <div class="form-input"></div>
          </div>
        </div>
        ` : `
        <div class="form-section">
          <div class="form-title">Corporate Information</div>
          <div class="form-field">
            <span class="form-label">Company Name:</span>
            <div class="form-input"></div>
          </div>
          <div class="form-field">
            <span class="form-label">Registration Number:</span>
            <div class="form-input"></div>
          </div>
          <div class="form-field">
            <span class="form-label">Business Activity:</span>
            <div class="form-input"></div>
          </div>
          <div class="form-field">
            <span class="form-label">Annual Turnover:</span>
            <div class="form-input"></div>
          </div>
        </div>
        `}

        <div class="form-section">
          <div class="form-title">Banking Services Required</div>
          <div class="checkbox-field">
            <input type="checkbox"> Current Account
          </div>
          <div class="checkbox-field">
            <input type="checkbox"> Savings Account
          </div>
          <div class="checkbox-field">
            <input type="checkbox"> Investment Services
          </div>
          <div class="checkbox-field">
            <input type="checkbox"> Private Banking
          </div>
          <div class="checkbox-field">
            <input type="checkbox"> Foreign Exchange
          </div>
          <div class="checkbox-field">
            <input type="checkbox"> Trade Finance
          </div>
        </div>

        <div class="form-section">
          <div class="form-title">Declarations</div>
          <div class="checkbox-field">
            <input type="checkbox"> I confirm that all information provided is true and accurate
          </div>
          <div class="checkbox-field">
            <input type="checkbox"> I agree to Alhambra Bank & Trust's Terms and Conditions
          </div>
          <div class="checkbox-field">
            <input type="checkbox"> I consent to credit and background checks
          </div>
          <div class="checkbox-field">
            <input type="checkbox"> I agree to comply with FATCA and CRS reporting requirements
          </div>
        </div>

        <div class="signature-section">
          <div class="form-title">Signatures</div>
          <div style="display: flex; justify-content: space-between; margin-top: 30px;">
            <div>
              <div class="signature-line"></div>
              <p>Applicant Signature</p>
            </div>
            <div>
              <div class="signature-line"></div>
              <p>Date</p>
            </div>
          </div>
          ${formType === 'Corporate' ? `
          <div style="display: flex; justify-content: space-between; margin-top: 30px;">
            <div>
              <div class="signature-line"></div>
              <p>Authorized Signatory</p>
            </div>
            <div>
              <div class="signature-line"></div>
              <p>Company Seal</p>
            </div>
          </div>
          ` : ''}
        </div>
        
        <div class="footer">
          <p><strong>For Bank Use Only:</strong></p>
          <p>Application Received: ________________ Reference Number: ________________</p>
          <p>Processed By: ________________ Date: ________________</p>
          <br>
          <p>© 2025 Alhambra Bank & Trust Limited. All Rights Reserved. Licensed by CIMA.</p>
        </div>
      </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(formHTML);
    printWindow.document.close();
    printWindow.print();
  };

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

      {/* Printable Forms Section */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg mb-8">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-2">🖨️</span>
          <h4 className="font-bold text-blue-800">
            {language === 'en' ? 'Printable Application Forms' : 
             language === 'es' ? 'Formularios de Aplicación Imprimibles' : 
             language === 'ar' ? 'نماذج التطبيق القابلة للطباعة' : 
             '可打印申请表格'}
          </h4>
        </div>
        <p className="text-blue-700 mb-4">
          {language === 'en' ? 'Download and print our application forms to complete offline and submit in person or by mail.' :
           language === 'es' ? 'Descarga e imprime nuestros formularios de solicitud para completar sin conexión y enviar en persona o por correo.' :
           language === 'ar' ? 'قم بتنزيل وطباعة نماذج الطلب الخاصة بنا لإكمالها دون اتصال وتقديمها شخصياً أو بالبريد.' :
           '下载并打印我们的申请表格，以便离线完成并亲自或通过邮件提交。'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => generatePrintableForm('Individual')}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="mr-2">👤</span>
            {language === 'en' ? 'Print Individual Account Form' :
             language === 'es' ? 'Imprimir Formulario de Cuenta Individual' :
             language === 'ar' ? 'طباعة نموذج الحساب الفردي' :
             '打印个人账户表格'}
          </button>
          
          <button 
            onClick={() => generatePrintableForm('Corporate')}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="mr-2">🏢</span>
            {language === 'en' ? 'Print Corporate Account Form' :
             language === 'es' ? 'Imprimir Formulario de Cuenta Corporativa' :
             language === 'ar' ? 'طباعة نموذج الحساب المؤسسي' :
             '打印企业账户表格'}
          </button>
        </div>
        <div className="mt-4 text-sm text-blue-600">
          <p>
            <strong>
              {language === 'en' ? 'Note:' :
               language === 'es' ? 'Nota:' :
               language === 'ar' ? 'ملاحظة:' :
               '注意：'}
            </strong> 
            {language === 'en' ? ' Forms include all required fields, signature lines, and bank processing sections. Please complete all sections before submission.' :
             language === 'es' ? ' Los formularios incluyen todos los campos requeridos, líneas de firma y secciones de procesamiento bancario. Complete todas las secciones antes de enviar.' :
             language === 'ar' ? ' تتضمن النماذج جميع الحقول المطلوبة وخطوط التوقيع وأقسام المعالجة المصرفية. يرجى إكمال جميع الأقسام قبل التقديم.' :
             ' 表格包含所有必填字段、签名行和银行处理部分。请在提交前完成所有部分。'}
          </p>
        </div>
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
