import { Globe } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import type { Language } from '@/i18n/translations';

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();

  const toggleLang = () => {
    const next: Language = lang === 'en' ? 'zh' : 'en';
    setLang(next);
  };

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-foreground hover:bg-accent transition-smooth border"
      title={t('language.label')}
    >
      <Globe className="w-4 h-4" />
      <span className="hidden sm:inline">{t(`language.${lang}`)}</span>
    </button>
  );
}
