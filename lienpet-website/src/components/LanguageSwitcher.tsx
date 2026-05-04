import { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import { languageNames, type Language } from '@/i18n/translations';

interface LanguageSwitcherProps {
  compact?: boolean;
}

const languages: Language[] = [
  'en', 'zh', 'fr', 'de', 'es', 'pt', 'ru', 'ja', 'ko', 'ar',
  'hi', 'bn', 'pt-BR', 'id', 'ur', 'es-419', 'pa', 'vi', 'it', 'tr',
  'nl', 'pl', 'sv', 'no', 'da', 'fi', 'el', 'cs', 'hu', 'ro',
];

export default function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
  const { lang, setLang, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const currentLangInfo = languageNames[lang];

  const handleSelect = (newLang: Language) => {
    setLang(newLang);
    setIsOpen(false);
  };

  if (compact) {
    const flag = lang === 'en' ? 'EN' : lang === 'zh' ? 'CN' : lang.toUpperCase();
    return (
      <button
        onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700 transition-colors w-full"
        title={currentLangInfo.native}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm">{flag}</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-foreground hover:bg-accent transition-smooth border"
        title={t('language.label')}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLangInfo.native}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-1 w-56 max-h-80 overflow-y-auto bg-background border rounded-md shadow-lg z-50 py-1">
            {languages.map((langCode) => {
              const info = languageNames[langCode];
              const isSelected = langCode === lang;
              return (
                <button
                  key={langCode}
                  onClick={() => handleSelect(langCode)}
                  className={`w-full px-3 py-2 text-left text-sm flex items-center justify-between hover:bg-accent transition-colors ${
                    isSelected ? 'bg-accent font-medium' : ''
                  }`}
                >
                  <span>{info.native}</span>
                  <span className="text-xs text-muted-foreground ml-2">{info.english}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}