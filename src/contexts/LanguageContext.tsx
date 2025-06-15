
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  zh: {
    // 網站標題和描述
    siteTitle: "日語助詞與形容詞練習平台",
    siteDescription: "專業的日語學習工具",
    chooseMode: "選擇練習模式",
    
    // 練習模式
    particleChoice: "助詞練習題（選擇題）",
    particleFillBlank: "助詞練習題（填充題）",
    scenarioPractice: "情境練習題",
    adjectivePractice: "形容詞變化練習",
    
    // 描述文字
    practiceDescription: "練習日文助詞的使用方法",
    modeExplanation: "選擇題有標準答案，填充題為自由練習，情境練習題為對話場景",
    adjectiveExplanation: "形容詞變化練習可以學習い形容詞和な形容詞的各種變化形式",
    
    // 通用按鈕
    back: "返回",
    exit: "離開",
    restart: "重新開始",
    next: "下一題",
    finish: "完成",
    viewAnswers: "查看答案",
    
    // 404頁面
    pageNotFound: "頁面未找到",
    backToHome: "回到首頁"
  },
  en: {
    // 網站標題和描述
    siteTitle: "Japanese Particles & Adjectives Practice Platform",
    siteDescription: "Professional Japanese Learning Tool",
    chooseMode: "Choose Practice Mode",
    
    // 練習模式
    particleChoice: "Particle Practice (Multiple Choice)",
    particleFillBlank: "Particle Practice (Fill in the Blank)",
    scenarioPractice: "Scenario Practice",
    adjectivePractice: "Adjective Conjugation Practice",
    
    // 描述文字
    practiceDescription: "Practice using Japanese particles correctly",
    modeExplanation: "Multiple choice has standard answers, fill-in-the-blank is free practice, scenario practice features dialogue situations",
    adjectiveExplanation: "Adjective conjugation practice helps you learn various forms of i-adjectives and na-adjectives",
    
    // 通用按鈕
    back: "Back",
    exit: "Exit",
    restart: "Restart",
    next: "Next",
    finish: "Finish",
    viewAnswers: "View Answers",
    
    // 404頁面
    pageNotFound: "Page Not Found",
    backToHome: "Back to Home"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.zh] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
