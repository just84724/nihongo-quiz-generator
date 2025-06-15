
import { Language, Translations } from '../types';
import { zhTranslations } from '../translations/zh';
import { enTranslations } from '../translations/en';

const translations: Record<Language, Translations> = {
  zh: zhTranslations,
  en: enTranslations
};

export const createTranslationFunction = (language: Language) => {
  return (key: string, params?: Record<string, string | number>): string => {
    let text = translations[language][key] || key;
    
    // Replace parameters in the text
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`{${param}}`, String(value));
      });
    }
    
    return text;
  };
};
