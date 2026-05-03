import { useState } from 'react';
import { MessageSquare, Send, Lightbulb, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { useI18n } from '@/i18n/I18nContext';

export default function FeedbackPage() {
  const { addMessage } = useStore();
  const { t } = useI18n();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState<'suggestion' | 'product-request'>('suggestion');
  const [content, setContent] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    addMessage({ name: name.trim(), email: email.trim(), type, content: content.trim() });
    setName('');
    setEmail('');
    setContent('');
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-full brand-gradient flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-6 h-6 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">{t('feedback.title')}</h1>
        <p className="text-muted-foreground text-sm">
          {t('feedback.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-6 space-y-5">
        {/* Type selector */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">{t('feedback.typeLabel')}</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setType('suggestion')}
              className={`flex items-center gap-2 p-3 rounded-lg border text-sm transition-smooth ${
                type === 'suggestion'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              {t('feedback.suggestion')}
            </button>
            <button
              type="button"
              onClick={() => setType('product-request')}
              className={`flex items-center gap-2 p-3 rounded-lg border text-sm transition-smooth ${
                type === 'product-request'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              <Package className="w-4 h-4" />
              {t('feedback.productRequest')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">{t('feedback.nameLabel')}</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={t('feedback.namePlaceholder')}
              className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">{t('feedback.emailLabel')}</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t('feedback.emailPlaceholder')}
              className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            {type === 'suggestion' ? t('feedback.suggestionLabel') : t('feedback.requestLabel')}
          </label>
          <textarea
            required
            rows={5}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder={type === 'suggestion' ? t('feedback.suggestionPlaceholder') : t('feedback.requestPlaceholder')}
            className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>

        <Button type="submit" className="w-full" disabled={!name.trim() || !content.trim()}>
          <Send className="w-4 h-4 mr-2" />
          {t('feedback.submit')}
        </Button>
      </form>
    </main>
  );
}