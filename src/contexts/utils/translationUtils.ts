
import { Language, Translations } from '../types';
import { zhTranslations } from '../translations/zh';
import { enTranslations } from '../translations/en';

const translations: Record<Language, Translations> = {
  zh: zhTranslations,
  en: enTranslations
};

export const createTranslationFunction = (language: Language) => {
  return (key: string, params?: Record<string, string | number>): string => {
    try {
      const translation = translations[language]?.[key];
      
      // If it's an array, return the key (arrays are handled differently in components)
      if (Array.isArray(translation)) {
        return key;
      }
      
      let text = translation || key;
      
      // Replace parameters in the text
      if (params) {
        Object.entries(params).forEach(([param, value]) => {
          text = text.replace(`{${param}}`, String(value));
        });
      }
      
      return text;
    } catch (error) {
      console.error('Translation error:', error, 'for key:', key);
      return key;
    }
  };
};
