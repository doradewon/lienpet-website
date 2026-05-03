import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { useI18n } from '@/i18n/I18nContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { getFavorites } = useStore();
  const { t } = useI18n();
  const favCount = getFavorites().length;

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/products', label: t('nav.products') },
    { path: '/favorites', label: t('nav.favorites') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="LienPet" className="object-contain" style={{ width: '4cm', height: '3cm' }} />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                location.pathname === item.path
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-accent'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            to="/feedback"
            className="relative p-2 rounded-md text-foreground hover:bg-accent transition-smooth"
            title={t('nav.feedback')}
          >
            <MessageSquare className="w-5 h-5" />
          </Link>
          <Link
            to="/favorites"
            className="relative p-2 rounded-md text-foreground hover:bg-accent transition-smooth"
            title={t('nav.favorites')}
          >
            <Heart className="w-5 h-5" />
            {favCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                {favCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-md text-foreground hover:bg-accent"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-card animate-fade-in">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-md text-sm font-medium transition-smooth ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-accent'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}