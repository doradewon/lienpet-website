import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Compass, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { categories } from '@/data/categories';
import { useStore } from '@/store/useStore';
import { useI18n } from '@/i18n/I18nContext';

export default function HomePage() {
  const { products } = useStore();
  const { t } = useI18n();
  const featuredProducts = products.slice(0, 4);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[700px]">
        <div className="absolute inset-0 bg-black">
          <img
            src="/images/hero-banner.png"
            alt="LienPet Hero"
            className="w-full h-full object-cover opacity-70"
            style={{ objectPosition: '50% 15%' }}
          />
        </div>
        <div className="relative container mx-auto px-4 pt-48 pb-24 md:pt-64 md:pb-36" style={{ maxWidth: '1200px' }}>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Global Custom | Premium Pet Goods
            </h1>
            <p className="text-lg md:text-xl text-white font-semibold mb-8">
              One-stop Global Solution
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/products">
                <Button variant="brand" size="lg" className="bg-green-700 hover:bg-green-800 rounded-full px-8">
                  Explore Collection
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="bg-transparent border-white/80 text-white hover:bg-white/10 rounded-full px-8">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border mx-auto mb-4 flex items-center justify-center">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Global Shipping</h3>
              <p className="text-muted-foreground">
                Seamless delivery worldwide for all your premium pet needs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border mx-auto mb-4 flex items-center justify-center">
                <Compass className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Custom Solutions</h3>
              <p className="text-muted-foreground">
                Tailored designs to fit perfectly into your modern lifestyle.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card border mx-auto mb-4 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">
                Consciously crafted with sustainable, high-grade materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-16" style={{ maxWidth: '1200px' }}>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t('home.categories')}</h2>
          <p className="text-muted-foreground">{t('home.exploreRange')}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="group relative rounded-xl overflow-hidden aspect-[4/3] animate-fade-in"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <img
                src={cat.image}
                alt={t('categories.' + cat.id)}
                className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-primary-foreground font-semibold text-sm md:text-base">{t('categories.' + cat.id)}</h3>
                <p className="text-primary-foreground/70 text-xs mt-0.5">
                  {cat.subcategories.map(s => t('subcategories.' + s.id)).join(' / ')}
                </p>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                <ArrowRight className="w-4 h-4 text-primary-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="subtle-gradient py-16">
        <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">{t('home.featured')}</h2>
              <p className="text-muted-foreground text-sm">{t('home.premiumProducts')}</p>
            </div>
            <Link to="/products" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
              {t('home.viewAll')} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}