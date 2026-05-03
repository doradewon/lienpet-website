import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { categories } from '@/data/categories';
import { useStore } from '@/store/useStore';
import { useI18n } from '@/i18n/I18nContext';

export default function ProductsPage() {
  const { t } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategoryId = searchParams.get('category') || '';
  const activeSubId = searchParams.get('sub') || '';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { products } = useStore();

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategoryId) {
      result = result.filter(p => p.categoryId === activeCategoryId);
    }
    if (activeSubId) {
      result = result.filter(p => p.subcategoryId === activeSubId);
    }
    return result;
  }, [products, activeCategoryId, activeSubId]);

  const activeCategory = categories.find(c => c.id === activeCategoryId);

  function selectCategory(catId: string) {
    if (catId === activeCategoryId) {
      setSearchParams({});
    } else {
      setSearchParams({ category: catId });
    }
  }

  function selectSub(subId: string) {
    if (subId === activeSubId) {
      setSearchParams(activeCategoryId ? { category: activeCategoryId } : {});
    } else {
      setSearchParams({ category: activeCategoryId, sub: subId });
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {activeCategory ? t('categories.' + activeCategory.id) : t('products.title')}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t('products.count', { count: filtered.length })}
          </p>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-2 rounded-md border text-foreground hover:bg-accent"
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'fixed inset-0 z-40 bg-foreground/40' : 'hidden'
          } md:block md:relative md:bg-transparent md:inset-auto md:z-auto`}
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className={`${
              sidebarOpen ? 'w-72 h-full bg-card p-4 overflow-y-auto' : 'w-56'
            } shrink-0`}
            onClick={e => e.stopPropagation()}
          >
            {sidebarOpen && (
              <div className="flex items-center justify-between mb-4 md:hidden">
                <h3 className="font-semibold text-foreground">{t('products.categories')}</h3>
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            )}
            <div className="space-y-1">
              <button
                onClick={() => { setSearchParams({}); setSidebarOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-smooth ${
                  !activeCategoryId ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent'
                }`}
              >
                {t('products.allProducts')}
              </button>
              {categories.map(cat => (
                <div key={cat.id}>
                  <button
                    onClick={() => { selectCategory(cat.id); setSidebarOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-smooth ${
                      activeCategoryId === cat.id ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent'
                    }`}
                  >
                    {t('categories.' + cat.id)}
                  </button>
                  {activeCategoryId === cat.id && (
                    <div className="ml-3 mt-1 space-y-0.5">
                      {cat.subcategories.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => { selectSub(sub.id); setSidebarOpen(false); }}
                          className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition-smooth ${
                            activeSubId === sub.id
                              ? 'bg-accent text-accent-foreground font-medium'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                          }`}
                        >
                          {t('subcategories.' + sub.id)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1 min-w-0">
          {activeCategoryId && (
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-accent text-accent-foreground border">
                {activeCategory && t('categories.' + activeCategory.id)}
                <button onClick={() => setSearchParams({})} className="ml-1 hover:text-destructive">
                  <X className="w-3 h-3" />
                </button>
              </span>
              {activeSubId && activeCategory && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-accent text-accent-foreground border">
                  {t('subcategories.' + activeSubId)}
                  <button onClick={() => setSearchParams({ category: activeCategoryId })} className="ml-1 hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">{t('products.noProducts')}</p>
              <Button variant="outline" onClick={() => setSearchParams({})}>
                {t('products.viewAll')}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}