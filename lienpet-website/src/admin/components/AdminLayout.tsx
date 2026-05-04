import { LayoutDashboard, Package, MessageSquare, Star, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useI18n } from '@/i18n/I18nContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
}

const navItems = [
  { id: 'dashboard', labelKey: 'admin.dashboard', icon: LayoutDashboard },
  { id: 'products', labelKey: 'admin.products', icon: Package },
  { id: 'messages', labelKey: 'admin.messages', icon: MessageSquare },
  { id: 'favorites', labelKey: 'admin.favorites', icon: Star },
];

export function AdminLayout({ children, currentPage }: AdminLayoutProps) {
  const { lang, t } = useI18n();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    window.location.href = '/';
  };

  const getLabel = (labelKey: string) => {
    const translation = t(labelKey);
    if (translation === labelKey) {
      const fallbackLabels: Record<string, string> = {
        'admin.dashboard': 'Dashboard',
        'admin.products': 'Products',
        'admin.messages': 'Messages',
        'admin.favorites': 'Favorites',
      };
      return fallbackLabels[labelKey] || labelKey;
    }
    return translation;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-800 text-white flex flex-col transition-all duration-300`}
      >
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            {sidebarOpen && (
              <span className="font-bold text-lg">LienPet Admin</span>
            )}
          </div>
        </div>

        <nav className="flex-1 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <a
                key={item.id}
                href={`/admin/${item.id}`}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                  isActive
                    ? 'bg-slate-700 text-blue-400'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{getLabel(item.labelKey)}</span>}
              </a>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="mb-4">
            <LanguageSwitcher compact />
          </div>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white w-full ${
              sidebarOpen ? '' : 'justify-center'
            }`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>{t('admin.logout') || (lang === 'en' ? 'Logout' : '退出')}</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">
              {navItems.find((item) => item.id === currentPage)?.labelKey ? getLabel(navItems.find((item) => item.id === currentPage)!.labelKey) : currentPage}
            </h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={sidebarOpen ? 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
