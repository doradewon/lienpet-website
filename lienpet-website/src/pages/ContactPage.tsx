import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/I18nContext';

export default function ContactPage() {
  const { t } = useI18n();
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t('contact.title')}</h1>
        <p className="text-muted-foreground">{t('contact.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-card border rounded-xl p-6 text-center transition-smooth hover:shadow-hover">
          <div className="w-12 h-12 rounded-full brand-gradient flex items-center justify-center mx-auto mb-4">
            <Mail className="w-5 h-5 text-primary-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">{t('contact.email')}</h3>
          <p className="text-sm text-muted-foreground">dora.dewon@gmail.com</p>
        </div>
        <div className="bg-card border rounded-xl p-6 text-center transition-smooth hover:shadow-hover">
          <div className="w-12 h-12 rounded-full brand-gradient flex items-center justify-center mx-auto mb-4">
            <Phone className="w-5 h-5 text-primary-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">{t('contact.phone')}</h3>
          <p className="text-sm text-muted-foreground">+86 158 6890 2504</p>
        </div>
        <div className="bg-card border rounded-xl p-6 text-center transition-smooth hover:shadow-hover">
          <div className="w-12 h-12 rounded-full brand-gradient flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-5 h-5 text-primary-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">{t('contact.address')}</h3>
          <p className="text-sm text-muted-foreground">{t('contact.addressValue')}</p>
        </div>
      </div>

      {/* QR Codes */}
      <div className="bg-card border rounded-xl p-8 text-center">
        <h2 className="text-xl font-bold text-foreground mb-2">{t('contact.scanTitle')}</h2>
        <p className="text-sm text-muted-foreground mb-6">{t('contact.scanSubtitle')}</p>
        <div className="flex justify-center gap-10">
          <div>
            <div className="w-36 h-36 rounded-xl flex items-center justify-center mb-3 border mx-auto overflow-hidden">
              <img src="/images/wechat-qr.jpg" alt="WeChat QR" className="w-full h-full object-cover" style={{ filter: 'brightness(0.5) contrast(6)' }} />
            </div>
            <p className="text-sm font-medium text-foreground">{t('contact.wechat')}</p>
            <p className="text-xs text-muted-foreground">WeChat</p>
          </div>
          <div>
            <div className="w-36 h-36 rounded-xl flex items-center justify-center mb-3 border mx-auto overflow-hidden">
              <img src="/images/whatsapp-qr.jpg" alt="WhatsApp QR" className="w-full h-full object-cover" style={{ filter: 'none' }} />
            </div>
            <p className="text-sm font-medium text-foreground">WhatsApp</p>
            <p className="text-xs text-muted-foreground">+86 158 6890 2504</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link to="/feedback">
          <Button variant="brand" size="lg">
            <MessageCircle className="w-4 h-4 mr-2" />
            {t('contact.leaveMessage')}
          </Button>
        </Link>
      </div>
    </main>
  );
}