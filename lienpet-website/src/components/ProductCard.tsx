import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { useI18n } from '@/i18n/I18nContext';
import type { Product } from '@/data/categories';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleFavorite } = useStore();
  const { t } = useI18n();
  const productName = t(`product.${product.id}.name`) || product.name;
  const productDesc = t(`product.${product.id}.description`) || product.description;

  return (
    <div className="group bg-card rounded-lg border overflow-hidden transition-smooth hover:shadow-hover">
      <div className="relative aspect-square overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0] || '/images/cat-health.png'}
            alt={productName}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(product.id);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-smooth ${
            product.isFavorite
              ? 'bg-destructive text-destructive-foreground'
              : 'bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-destructive'
          }`}
        >
          <Heart className={`w-4 h-4 ${product.isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-foreground text-sm leading-tight mb-1 group-hover:text-primary transition-smooth">
            {productName}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground mb-2">
          {productDesc.substring(0, 50)}...
        </p>
        <span className="text-xs font-medium text-brand">{product.price}</span>
      </div>
    </div>
  );
}