import { Package, MessageSquare, Star, TrendingUp } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useI18n } from '@/i18n/I18nContext';

export function DashboardPage() {
  const { products, messages, getFavorites } = useStore();
  const { lang } = useI18n();
  const favorites = getFavorites();

  const stats = [
    {
      title: lang === 'en' ? 'Total Products' : '产品总数',
      value: products.length,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      title: lang === 'en' ? 'New Messages' : '新留言',
      value: messages.length,
      icon: MessageSquare,
      color: 'bg-green-500',
    },
    {
      title: lang === 'en' ? 'Favorites' : '收藏数',
      value: favorites.length,
      icon: Star,
      color: 'bg-yellow-500',
    },
    {
      title: lang === 'en' ? 'OEM Products' : 'OEM产品',
      value: products.filter(p => p.isOEM).length,
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ];

  const recentMessages = messages.slice(-5).reverse();
  const recentProducts = products.slice(-5).reverse();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              {lang === 'en' ? 'Recent Messages' : '最近留言'}
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentMessages.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                {lang === 'en' ? 'No messages yet' : '暂无留言'}
              </div>
            ) : (
              recentMessages.map((msg) => (
                <div key={msg.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">{msg.name}</span>
                    <span className="text-xs text-gray-400">
                      {formatDate(msg.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {msg.content}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-gray-400">{msg.email}</span>
                    {msg.phone && (
                      <span className="text-xs text-gray-400">{msg.phone}</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              {lang === 'en' ? 'Recent Products' : '最近产品'}
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentProducts.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                {lang === 'en' ? 'No products yet' : '暂无产品'}
              </div>
            ) : (
              recentProducts.map((product) => (
                <div key={product.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">
                          {product.name}
                        </span>
                        {product.isOEM && (
                          <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded">
                            OEM
                          </span>
                        )}
                        {product.isODM && (
                          <span className="text-xs px-2 py-0.5 bg-green-100 text-green-600 rounded">
                            ODM
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {product.translations?.en?.name || ''}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
