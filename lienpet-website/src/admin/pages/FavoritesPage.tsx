import { Star, Package } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useI18n } from '@/i18n/I18nContext';
import { categories } from '@/data/categories';

export function FavoritesPage() {
  const { getFavorites, toggleFavorite } = useStore();
  const { lang } = useI18n();
  const favorites = getFavorites();

  const getCategoryName = (id: string) => {
    const category = categories.find((c) => c.id === id);
    return category?.name || id;
  };

  const handleRemoveFavorite = (productId: string) => {
    toggleFavorite(productId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">
            {lang === 'en' ? `Total: ${favorites.length} favorite products` : `共 ${favorites.length} 个收藏产品`}
          </p>
        </div>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => handleRemoveFavorite(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  title={lang === 'en' ? 'Remove from favorites' : '取消收藏'}
                >
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                </button>
                <div className="absolute top-3 left-3 flex gap-2">
                  {product.isOEM && (
                    <span className="text-xs px-2 py-1 bg-blue-600 text-white rounded-full">
                      OEM
                    </span>
                  )}
                  {product.isODM && (
                    <span className="text-xs px-2 py-1 bg-green-600 text-white rounded-full">
                      ODM
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                {product.translations?.en?.name && (
                  <p className="text-sm text-gray-500 mb-2">{product.translations.en.name}</p>
                )}
                <p className="text-xs text-gray-400 mb-3">
                  {getCategoryName(product.categoryId)}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
                {product.price && (
                  <p className="text-lg font-semibold text-blue-600">{product.price}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 py-16 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {lang === 'en' ? 'No Favorite Products' : '暂无收藏产品'}
          </h3>
          <p className="text-gray-500 mb-4">
            {lang === 'en' ? 'Customers have not favorited any products yet.' : '客户还没有收藏任何产品'}
          </p>
          <a
            href="/admin/products"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Package className="w-4 h-4" />
            {lang === 'en' ? 'View Products' : '查看产品'}
          </a>
        </div>
      )}
    </div>
  );
}
