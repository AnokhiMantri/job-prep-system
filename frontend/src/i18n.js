import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: { 
    translation: { 
      welcome: "Welcome to CareerForge AI", 
      login: "Login", 
      register: "Register", 
      dashboard: "Dashboard",
      logout: "Logout",
      resume_analysis_title: "📄 Resume Analysis & ATS Optimization",
      resume_analysis_desc: "Upload your resume to get instant feedback from Gemini AI.",
      upload_resume_title: "Upload Resume (PDF/DOCX)",
      upload_btn: "Upload & Analyze",
      analyzing_btn: "Analyzing with Gemini...",
      error_upload: "An error occurred during upload."
    } 
  },
  hi: { 
    translation: { 
      welcome: "CareerForge AI में आपका स्वागत है", 
      login: "लॉग इन करें", 
      register: "पंजीकरण", 
      dashboard: "डैशबोर्ड",
      logout: "लॉग आउट",
      resume_analysis_title: "📄 रेज़्यूमे विश्लेषण और एटीएस अनुकूलन",
      resume_analysis_desc: "जेमिनी एआई से तत्काल प्रतिक्रिया प्राप्त करने के लिए अपना रेज़्यूमे अपलोड करें।",
      upload_resume_title: "रेज़्यूमे अपलोड करें (PDF/DOCX)",
      upload_btn: "अपलोड करें और विश्लेषण करें",
      analyzing_btn: "जेमिनी के साथ विश्लेषण कर रहा है...",
      error_upload: "अपलोड के दौरान त्रुटि हुई।"
    } 
  },
  mr: { 
    translation: { 
      welcome: "CareerForge AI मध्ये आपले स्वागत आहे", 
      login: "लॉग इन करा", 
      register: "नोंदणी करा", 
      dashboard: "डॅशबोर्ड",
      logout: "लॉग आउट",
      resume_analysis_title: "📄 रेझ्युमे विश्लेषण आणि एटीएस ऑप्टिमायझेशन",
      resume_analysis_desc: "जेमिनी एआय कडून त्वरित अभिप्राय मिळविण्यासाठी तुमचा रेझ्युमे अपलोड करा.",
      upload_resume_title: "रेझ्युमे अपलोड करा (PDF/DOCX)",
      upload_btn: "अपलोड करा आणि विश्लेषण करा",
      analyzing_btn: "जेमिनी सोबत विश्लेषण करत आहे...",
      error_upload: "अपलोड करताना त्रुटी आली."
    } 
  },
  gu: { 
    translation: { 
      welcome: "CareerForge AI માં તમારું સ્વાગત છે", 
      login: "લૉગિન કરો", 
      register: "નોંધણી કરો", 
      dashboard: "ડેશબોર્ડ",
      resume_analysis_title: "📄 રેઝ્યૂમે વિશ્લેષણ અને એટીએસ ઑપ્ટિમાઇઝેશન",
      resume_analysis_desc: "જેમિની એઆઈ તરફથી તાત્કાલિક પ્રતિસાદ મેળવવા માટે તમારો રેઝ્યૂમે અપલોડ કરો.",
      upload_resume_title: "રેઝ્યૂમે અપલોડ કરો (PDF/DOCX)",
      upload_btn: "અપલોડ કરો અને વિશ્લેષણ કરો",
      analyzing_btn: "જેમિની સાથે વિશ્લેષણ કરી રહ્યા છીએ...",
      error_upload: "અપલોડ દરમિયાન ભૂલ આવી."
    } 
  },
  bn: { 
    translation: { 
      welcome: "CareerForge AI তে আপনাকে স্বাগতম", 
      login: "লগইন", 
      register: "নিবন্ধন", 
      dashboard: "ড্যাশবোর্ড",
      logout: "লগআউট",
      resume_analysis_title: "📄 জীবনবৃত্তান্ত বিশ্লেষণ এবং এটিএস অপ্টিমাইজেশন",
      resume_analysis_desc: "জেমিনি এআই থেকে তাৎক্ষণিক প্রতিক্রিয়া পেতে আপনার জীবনবৃত্তান্ত আপলোড করুন।",
      upload_resume_title: "জীবনবৃত্তান্ত আপলোড করুন (PDF/DOCX)",
      upload_btn: "আপলোড এবং বিশ্লেষণ করুন",
      analyzing_btn: "জেমিনির সাথে বিশ্লেষণ করা হচ্ছে...",
      error_upload: "আপলোড করার সময় একটি ত্রুটি ঘটেছে।"
    } 
  },
  ta: { 
    translation: { 
      welcome: "CareerForge AI க்கு நல்வரவு", 
      login: "உள்நுழை", 
      register: "பதிவு செய்", 
      dashboard: "டாஷ்போர்டு",
      logout: " வெளியேறு",
      resume_analysis_title: "📄 ரெஸ்யூம் பகுப்பாய்வு & ஏடிஎஸ் உகப்பாக்கம்",
      resume_analysis_desc: "ஜெமினி AI இலிருந்து உடனடி கருத்துக்களைப் பெற உங்கள் ரெஸ்யூமைப் பதிவேற்றவும்.",
      upload_resume_title: "ரெஸ்யூமைப் பதிவேற்றவும் (PDF/DOCX)",
      upload_btn: "பதிவேற்று & பகுப்பாய்வு செய்",
      analyzing_btn: "ஜெமினியுடன் பகுப்பாய்வு செய்யப்படுகிறது...",
      error_upload: "பதிவேற்றத்தின் போது பிழை ஏற்பட்டது."
    } 
  },
  te: { 
    translation: { 
      welcome: "CareerForge AI కి స్వాగతం", 
      login: "లాగిన్", 
      register: "నమోదు", 
      dashboard: "డాష్‌బోర్డ్",
      logout: "లాగోవుట్",
      resume_analysis_title: "📄 రెజ్యూమ్ విశ్లేషణ & ATS ఆప్టిమైజేషన్",
      resume_analysis_desc: "జెమిని AI నుండి తక్షణ అభిప్రాయాన్ని పొందడానికి మీ రెజ్యూమ్‌ను అప్‌లోడ్ చేయండి.",
      upload_resume_title: "రెజ్యూమ్ అప్‌లోడ్ చేయండి (PDF/DOCX)",
      upload_btn: "అప్‌లోడ్ చేయండి & విశ్లేషించండి",
      analyzing_btn: "జెమినితో విశ్లేషిస్తోంది...",
      error_upload: "అప్‌లోడ్ సమయంలో లోపం సంభవించింది."
    } 
  },
  kn: { 
    translation: { 
      welcome: "CareerForge AI ಗೆ ಸುಸ್ವಾಗತ", 
      login: "ಲಾಗಿನ್", 
      register: "ನೋಂದಣಿ", 
      dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      logout: "ಲಾಗೌಟ್",
      resume_analysis_title: "📄 ರೆಸ್ಯೂಮ್ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಎಟಿಎಸ್ ಆಪ್ಟಿಮೈಸೇಶನ್",
      resume_analysis_desc: "ಜೆಮಿನಿ ಎಐ ನಿಂದ ತ್ವರಿತ ಪ್ರತಿಕ್ರಿಯೆ ಪಡೆಯಲು ನಿಮ್ಮ ರೆಸ್ಯೂಮ್ ಅನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
      upload_resume_title: "ರೆಸ್ಯೂಮ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ (PDF/DOCX)",
      upload_btn: "ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ವಿಶ್ಲೇಷಿಸಿ",
      analyzing_btn: "ಜೆಮಿನಿ ಜೊತೆಗೆ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
      error_upload: "ಅಪ್‌ಲೋಡ್ ಮಾಡುವಾಗ ದೋಷ ಸಂಭವಿಸಿದೆ."
    } 
  },
  ml: { 
    translation: { 
      welcome: "CareerForge AI-ലേക്ക് സ്വാഗതം", 
      login: "ലോഗിൻ", 
      register: "രജിസ്റ്റർ ചെയ്യുക", 
      dashboard: "ഡാഷ്‌ബോർഡ്",
      logout: "ലോഗ്ആൗട്ട്",
      resume_analysis_title: "📄 റെസ്യൂമെ വിശകലനവും ATS ഒപ്റ്റിമൈസേഷനും",
      resume_analysis_desc: "ജെമിനി AI-ൽ നിന്ന് തൽക്ഷണ ഫീഡ്‌ബാക്ക് ലഭിക്കുന്നതിന് നിങ്ങളുടെ റെസ്യൂമെ അപ്‌ലോഡ് ചെയ്യുക.",
      upload_resume_title: "റെസ്യൂമെ അപ്‌ലോഡ് ചെയ്യുക (PDF/DOCX)",
      upload_btn: "അപ്‌ലോഡ് ചെയ്ത് വിശകലനം ചെയ്യുക",
      analyzing_btn: "ജെമിനി ഉപയോഗിച്ച് വിശകലനം ചെയ്യുന്നു...",
      error_upload: "അപ്‌ലോഡ് ചെയ്യുന്നതിനിടെ ഒരു പിശക് സംഭവിച്ചു."
    } 
  },
  pa: { 
    translation: { 
      welcome: "CareerForge AI ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ", 
      login: "ਲਾਗਇਨ", 
      register: "ਰਜਿਸਟਰ", 
      dashboard: "ਡੈਸ਼ਬੋਰਡ",
      logout: "ਲੌਗਆਉਟ",
      resume_analysis_title: "📄 ਰੈਜ਼ਿਊਮੇ ਵਿਸ਼ਲੇਸ਼ਣ ਅਤੇ ਏ.ਟੀ.ਐਸ. ਅਨੁਕੂਲਨ",
      resume_analysis_desc: "ਜੇਮਿਨੀ AI ਤੋਂ ਤੁਰੰਤ ਫੀਡਬੈਕ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਆਪਣਾ ਰੈਜ਼ਿਊਮੇ ਅਪਲੋਡ ਕਰੋ।",
      upload_resume_title: "ਰੈਜ਼ਿਊਮੇ ਅਪਲੋਡ ਕਰੋ (PDF/DOCX)",
      upload_btn: "ਅਪਲੋਡ ਕਰੋ ਅਤੇ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
      analyzing_btn: "ਜੇਮਿਨੀ ਨਾਲ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰ ਰਿਹਾ ਹੈ...",
      error_upload: "ਅਪਲੋਡ ਕਰਨ ਦੌਰਾਨ ਗਲਤੀ ਆਈ।"
    } 
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
