import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { useStore } from '@/store/useStore';
import { useI18n } from '@/i18n/I18nContext';

export default function FavoritesPage() {
  const { getFavorites } = useStore();
  const { t } = useI18n();
  const favorites = getFavorites();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Heart className="w-6 h-6 text-destructive" />
          {t('favorites.title')}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t('favorites.count', { count: favorites.length })}
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-4">{t('favorites.empty')}</p>
          <Link to="/products">
            <Button variant="outline">{t('favorites.browse')}</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}