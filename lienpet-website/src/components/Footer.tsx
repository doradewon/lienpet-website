import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <img src="/logo.png" alt="LienPet" className="object-contain mb-3" style={{ height: '60px' }} />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Global Custom | Premium Pet Goods | One-stop Global Solution
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-smooth">{t('nav.home')}</Link></li>
              <li><Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-smooth">{t('nav.products')}</Link></li>
              <li><Link to="/favorites" className="text-sm text-muted-foreground hover:text-primary transition-smooth">{t('nav.favorites')}</Link></li>
              <li><Link to="/feedback" className="text-sm text-muted-foreground hover:text-primary transition-smooth">{t('nav.feedback')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">{t('footer.contactInfo')}</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 shrink-0" />
                dora.dewon@gmail.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 shrink-0" />
                +86 158 6890 2504
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0" />
                {t('contact.addressValue')}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">{t('footer.followUs')}</h4>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="w-20 h-20 rounded-lg flex items-center justify-center mb-1 border overflow-hidden">
                  <img src="/images/wechat-qr.jpg" alt="WeChat QR" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs text-muted-foreground">{t('footer.wechat')}</span>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-lg flex items-center justify-center mb-1 border overflow-hidden">
                  <img src="/images/whatsapp-qr.jpg" alt="WhatsApp QR" className="w-full h-full object-cover" style={{ filter: 'none' }} />
                </div>
                <span className="text-xs text-muted-foreground">WhatsApp</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} LienPet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
