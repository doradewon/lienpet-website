import { useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ChevronLeft, ChevronRight, Plus, Trash2, ExternalLink, ArrowLeft, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories } from '@/data/categories';
import { useStore } from '@/store/useStore';
import { useI18n } from '@/i18n/I18nContext';

export default function ProductDetailPage() {
  const { t } = useI18n();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, toggleFavorite, updateProduct, addToast } = useStore();
  const product = products.find(p => p.id === id);
  const [currentImg, setCurrentImg] = useState(0);
  const [newLink, setNewLink] = useState('');
  const [newLinkLabel, setNewLinkLabel] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!product) {
    return (
      <main className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground mb-4">{t('productDetail.notFound')}</p>
        <Link to="/products"><Button variant="outline">{t('productDetail.backToProducts')}</Button></Link>
      </main>
    );
  }

  const category = categories.find(c => c.id === product.categoryId);
  const subcategory = category?.subcategories.find(s => s.id === product.subcategoryId);

  const productImages = product.images;
  const productId = product.id;
  const productLinks = product.links;

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const currentCount = productImages.length;
    const maxAdd = 10 - currentCount;
    if (maxAdd <= 0) {
      addToast(t('productDetail.maxImages'), 'error');
      return;
    }
    const newImages: string[] = [];
    const filesToProcess = Array.from(files).slice(0, maxAdd);
    filesToProcess.forEach(file => {
      const url = URL.createObjectURL(file);
      newImages.push(url);
    });
    updateProduct(productId, { images: [...productImages, ...newImages] });
  }

  function removeImage(index: number) {
    if (productImages.length <= 1) {
      addToast(t('productDetail.keepOneImage'), 'error');
      return;
    }
    const newImages = productImages.filter((_: string, i: number) => i !== index);
    updateProduct(productId, { images: newImages });
    if (currentImg >= newImages.length) setCurrentImg(newImages.length - 1);
  }

  function addLink() {
    if (!newLink.trim()) return;
    const link = {
      id: Date.now().toString(),
      url: newLink.trim(),
      label: newLinkLabel.trim() || newLink.trim(),
    };
    updateProduct(productId, { links: [...productLinks, link] });
    setNewLink('');
    setNewLinkLabel('');
  }

  function removeLink(linkId: string) {
    updateProduct(productId, { links: productLinks.filter(l => l.id !== linkId) });
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <button onClick={() => navigate(-1)} className="hover:text-primary transition-smooth flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> {t('productDetail.back')}
        </button>
        <span>/</span>
        <Link to="/products" className="hover:text-primary transition-smooth">{t('products.title')}</Link>
        {category && (
          <>
            <span>/</span>
            <Link to={`/products?category=${category.id}`} className="hover:text-primary transition-smooth">
              {t('categories.' + category.id)}
            </Link>
          </>
        )}
        {subcategory && (
          <>
            <span>/</span>
            <span className="text-foreground">{t('subcategories.' + subcategory.id)}</span>
          </>
        )}
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-square bg-muted rounded-xl overflow-hidden mb-3">
            <img
              src={product.images[currentImg]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImg(i => (i - 1 + product.images.length) % product.images.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-smooth"
                >
                  <ChevronLeft className="w-4 h-4 text-foreground" />
                </button>
                <button
                  onClick={() => setCurrentImg(i => (i + 1) % product.images.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-smooth"
                >
                  <ChevronRight className="w-4 h-4 text-foreground" />
                </button>
              </>
            )}
            <button
              onClick={() => removeImage(currentImg)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive/80 flex items-center justify-center hover:bg-destructive transition-smooth"
            >
              <X className="w-4 h-4 text-destructive-foreground" />
            </button>
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-card/80 backdrop-blur-sm text-xs text-foreground">
              {currentImg + 1} / {product.images.length}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImg(i)}
                className={`w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-smooth ${
                  i === currentImg ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
            {product.images.length < 10 && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-16 h-16 rounded-lg border-2 border-dashed border-muted-foreground/30 shrink-0 flex items-center justify-center hover:border-primary transition-smooth"
              >
                <Upload className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">{t(`product.${product.id}.name`) || product.name}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {category && <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs">{t('categories.' + category.id)}</span>}
                {subcategory && <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">{t('subcategories.' + subcategory.id)}</span>}
                {product.isOEM && <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-xs">OEM</span>}
                {product.isODM && <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-600 text-xs">ODM</span>}
              </div>
            </div>
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`p-2.5 rounded-full border transition-smooth ${
                product.isFavorite
                  ? 'bg-destructive/10 border-destructive/30 text-destructive'
                  : 'border-border text-muted-foreground hover:text-destructive hover:border-destructive/30'
              }`}
            >
              <Heart className={`w-5 h-5 ${product.isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t(`product.${product.id}.description`) || product.description}</p>
          {product.translations?.en && (
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <p className="text-xs text-muted-foreground mb-1">English</p>
              <h3 className="font-semibold text-foreground mb-1">{product.translations.en.name}</h3>
              <p className="text-sm text-muted-foreground">{product.translations.en.description}</p>
            </div>
          )}

          <div className="text-lg font-bold text-brand mb-6">{product.price}</div>

          {/* Product Links */}
          <div className="border rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-foreground text-sm mb-3">{t('productDetail.productLinks')}</h3>
            {product.links.length > 0 && (
              <div className="space-y-2 mb-3">
                {product.links.map(link => (
                  <div key={link.id} className="flex items-center gap-2 text-sm">
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline truncate flex-1"
                    >
                      {link.label}
                    </a>
                    <button
                      onClick={() => removeLink(link.id)}
                      className="text-muted-foreground hover:text-destructive transition-smooth shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="space-y-2">
              <input
                type="text"
                placeholder={t('productDetail.linkNamePlaceholder')}
                value={newLinkLabel}
                onChange={e => setNewLinkLabel(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder={t('productDetail.linkUrlPlaceholder')}
                  value={newLink}
                  onChange={e => setNewLink(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addLink()}
                  className="flex-1 px-3 py-2 text-sm border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button size="sm" onClick={addLink} disabled={!newLink.trim()}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <Link to="/feedback">
            <Button variant="outline" className="w-full">{t('productDetail.feedbackCta')}</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}