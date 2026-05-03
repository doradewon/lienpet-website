import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Mail, Phone, MapPin } from 'lucide-react';
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-banner.png"
            alt="LienPet Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/50" />
        </div>
        <div className="relative container mx-auto px-4 py-24 md:py-36">
          <div className="max-w-2xl">
            <img src="/logo.png" alt="LienPet" className="object-contain mb-6 rounded-lg p-2" style={{ height: '14rem' }} />
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
              Global Custom | Premium Pet Goods
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
              One-stop Global Solution
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/products">
                <Button variant="brand" size="lg">
                  {t('home.browseAll')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="bg-card/20 border-primary-foreground/30 text-primary-foreground hover:bg-card/40 hover:text-primary-foreground">
                  {t('home.contactUs')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-16">
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
                <ChevronRight className="w-4 h-4 text-primary-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="subtle-gradient py-16">
        <div className="container mx-auto px-4">
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

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t('home.contactTitle')}</h2>
          <p className="text-muted-foreground">{t('home.contactSubtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-card border rounded-xl p-6 text-center transition-smooth hover:shadow-hover">
            <div className="w-12 h-12 rounded-full brand-gradient flex items-center justify-center mx-auto mb-4">
              <Mail className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{t('home.email')}</h3>
            <p className="text-sm text-muted-foreground">dora.dewon@gmail.com</p>
          </div>
          <div className="bg-card border rounded-xl p-6 text-center transition-smooth hover:shadow-hover">
            <div className="w-12 h-12 rounded-full brand-gradient flex items-center justify-center mx-auto mb-4">
              <Phone className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{t('home.phone')}</h3>
            <p className="text-sm text-muted-foreground">+86 158 6890 2504</p>
          </div>
          <div className="bg-card border rounded-xl p-6 text-center transition-smooth hover:shadow-hover">
            <div className="w-12 h-12 rounded-full brand-gradient flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{t('home.address')}</h3>
            <p className="text-sm text-muted-foreground">{t('home.addressValue')}</p>
          </div>
        </div>

        <div className="flex justify-center gap-8 mt-10">
          <div className="text-center">
            <div className="w-28 h-28 rounded-xl flex items-center justify-center mb-2 border mx-auto overflow-hidden">
              <img src="/images/wechat-qr.jpg" alt="WeChat QR" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">{t('home.wechat')}</span>
          </div>
          <div className="text-center">
            <div className="w-28 h-28 rounded-xl flex items-center justify-center mb-2 border mx-auto overflow-hidden">
              <img src="/images/whatsapp-qr.jpg" alt="WhatsApp QR" className="w-full h-full object-cover" style={{ filter: 'none' }} />
            </div>
            <span className="text-sm text-muted-foreground font-medium">WhatsApp</span>
          </div>
        </div>
      </section>
    </main>
  );
}