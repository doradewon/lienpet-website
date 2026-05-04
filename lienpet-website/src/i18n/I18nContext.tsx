import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { translations, type Language } from './translations';

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  const parts = path.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return typeof current === 'string' ? current : undefined;
}

const localeMap: Record<Language, string> = {
  en: 'en-US',
  zh: 'zh-CN',
  fr: 'fr-FR',
  de: 'de-DE',
  es: 'es-ES',
  pt: 'pt-PT',
  ru: 'ru-RU',
  ja: 'ja-JP',
  ko: 'ko-KR',
  ar: 'ar-SA',
  hi: 'hi-IN',
  bn: 'bn-BD',
  'pt-BR': 'pt-BR',
  id: 'id-ID',
  ur: 'ur-PK',
  'es-419': 'es-419',
  pa: 'pa-IN',
  vi: 'vi-VN',
  it: 'it-IT',
  tr: 'tr-TR',
  nl: 'nl-NL',
  pl: 'pl-PL',
  sv: 'sv-SE',
  no: 'nb-NO',
  da: 'da-DK',
  fi: 'fi-FI',
  el: 'el-GR',
  cs: 'cs-CZ',
  hu: 'hu-HU',
  ro: 'ro-RO',
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('lienpet-lang') as Language | null;
    if (saved && Object.keys(translations).includes(saved)) {
      return saved;
    }
    const browserLang = navigator.language.substring(0, 2) as Language;
    if (Object.keys(translations).includes(browserLang)) {
      return browserLang;
    }
    return 'en';
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('lienpet-lang', newLang);
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const dict = translations[lang] as unknown as Record<string, unknown>;
      let value = getNestedValue(dict, key);
      if (value === undefined) {
        const fallbackDict = translations.en as unknown as Record<string, unknown>;
        value = getNestedValue(fallbackDict, key);
      }
      if (value === undefined) return key;

      if (params) {
        return Object.entries(params).reduce((acc, [k, v]) => {
          return acc.replace(new RegExp(`{{${k}}}`, 'g'), String(v));
        }, value);
      }
      return value;
    },
    [lang]
  );

  useEffect(() => {
    document.documentElement.lang = localeMap[lang];
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
