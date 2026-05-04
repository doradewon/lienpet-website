import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useI18n } from '@/i18n/I18nContext';
import { categories } from '@/data/categories';
import { useStore } from '@/store/useStore';

// 子分类图片映射 - 使用真实的图片
const subcategoryImages: Record<string, Record<string, string>> = {
  // 保健品的6个剂型
  'health-supplements': {
    'soft-chews': '/images/cat-health.png',
    'powders': '/images/cat-health.png',
    'tablets': '/images/cat-health.png',
    'pastes': '/images/cat-health.png',
    'capsules': '/images/cat-health.png',
    'drops': '/images/cat-health.png'
  },
  // 小宠&异宠用品
  'small-exotic-pets': {
    'exotic-health': '/images/small-pets.png',
    'exotic-clothing': '/images/small-pets.png',
    'exotic-supplies': '/images/small-pets.png'
  },
  // 宠物智能产品
  'smart-pet': {
    'smart-litter': '/images/pet-smart.png',
    'smart-feeder': '/images/pet-smart.png',
    'smart-fountain': '/images/pet-smart.png',
    'smart-other': '/images/pet-smart.png'
  },
  // 宠物零食 & 湿粮
  'snacks-wet-food': {
    'cat-sticks': '/images/pet-snacks.png',
    'canned-food': '/images/pet-snacks.png',
    'snacks-other': '/images/pet-snacks.png'
  },
  // 宠物日用品
  'daily-supplies': {
    'outdoor-portable': '/images/pet-daily.png',
    'home-supplies': '/images/pet-daily.png',
    'daily-other': '/images/pet-daily.png'
  },
  // 宠物香水 & 香氛护理
  'perfume-fragrance': {
    'perfume-deodorizer': '/images/pet-perfume.png',
    'daily-cleaning': '/images/pet-perfume.png',
    'fragrance-other': '/images/pet-perfume.png'
  },
  // 宠物玩具
  'pet-toys': {
    'interactive-toys': '/images/pet-toys.png',
    'chew-toys': '/images/pet-toys.png',
    'puzzle-toys': '/images/pet-toys.png',
    'toys-other': '/images/pet-toys.png'
  },
  // 宠物服装&配饰
  'clothing-accessories': {
    'valentines': '/images/pet-clothing.png',
    'wedding': '/images/pet-clothing.png',
    'halloween': '/images/pet-clothing.png',
    'christmas': '/images/pet-clothing.png',
    'raincoat': '/images/pet-clothing.png',
    'autumn-winter': '/images/pet-clothing.png',
    'spring-summer': '/images/pet-clothing.png',
    'clothing-other': '/images/pet-clothing.png'
  },
  // 宠物纪念用品
  'memorial-items': {
    'urns': '/images/pet-memorial.png',
    'fur-collection': '/images/pet-memorial.png',
    '3d-painting': '/images/pet-memorial.png',
    'memorial-other': '/images/pet-memorial.png'
  }
};

export default function ProductsPage() {
  const { t, lang } = useI18n();
  const { products } = useStore();
  const [, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [activeCategoryId, setActiveCategoryId] = useState('');
  const [activeSubId, setActiveSubId] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catId = params.get('category') || '';
    const subId = params.get('sub') || '';
    setActiveCategoryId(catId);
    setActiveSubId(subId);
  }, [location.search]);

  function selectCategory(catId: string) {
    setActiveCategoryId(catId);
    setActiveSubId('');
    setSearchParams({ category: catId });
  }

  function selectSub(subId: string) {
    setActiveSubId(subId);
    setSearchParams({ category: activeCategoryId, sub: subId });
  }

  // 获取当前选中的分类
  const currentCategory = categories.find(c => c.id === activeCategoryId);
  
  // 获取筛选后的产品 - 使用 useStore 中的 products
  const filteredProducts = activeSubId 
    ? products.filter(p => p.categoryId === activeCategoryId && p.subcategoryId === activeSubId)
    : activeCategoryId 
      ? products.filter(p => p.categoryId === activeCategoryId)
      : [];

  // 获取子分类对应的图片
  const getSubcategoryImage = (catId: string, subId: string) => {
    if (subcategoryImages[catId] && subcategoryImages[catId][subId]) {
      return subcategoryImages[catId][subId];
    }
    
    const product = products.find(p => p.categoryId === catId && p.subcategoryId === subId);
    if (product && product.images.length > 0) {
      return product.images[0];
    }
    
    const cat = categories.find(c => c.id === catId);
    return cat?.image || '/images/cat-health.png';
  };

  // 获取产品显示名称
  const getProductName = (product: any) => {
    if (lang === 'zh') {
      return product.name;
    }
    return product.translations?.en?.name || product.name;
  };

  // 获取产品描述
  const getProductDescription = (product: any) => {
    if (lang === 'zh') {
      return product.description;
    }
    return product.translations?.en?.description || product.description;
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ color: '#000', fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
          {activeCategoryId ? t(`categories.${activeCategoryId}`) : t('products.title')}
        </h1>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <aside style={{ width: '200px', flexShrink: 0 }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>{t('products.categories')}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button
              onClick={() => { setSearchParams({}); setActiveCategoryId(''); setActiveSubId(''); }}
              style={{
                textAlign: 'left',
                padding: '8px 12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: !activeCategoryId ? '#2d5a27' : 'transparent',
                color: !activeCategoryId ? '#fff' : '#333',
                cursor: 'pointer'
              }}
            >
              {t('products.allProducts')}
            </button>
            {categories.map(cat => (
              <div key={cat.id}>
                <button
                  onClick={() => { selectCategory(cat.id); }}
                  style={{
                    textAlign: 'left',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: activeCategoryId === cat.id ? '#2d5a27' : 'transparent',
                    color: activeCategoryId === cat.id ? '#fff' : '#333',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  {t(`categories.${cat.id}`)}
                </button>
                {activeCategoryId === cat.id && (
                  <div style={{ marginLeft: '12px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {cat.subcategories.map(sub => (
                      <button
                        key={sub.id}
                        onClick={() => { selectSub(sub.id); }}
                        style={{
                          textAlign: 'left',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          border: 'none',
                          backgroundColor: activeSubId === sub.id ? '#f0e6d2' : 'transparent',
                          color: activeSubId === sub.id ? '#8b5a2b' : '#666',
                          cursor: 'pointer',
                          width: '100%',
                          fontSize: '12px'
                        }}
                      >
                        {t(`subcategories.${sub.id}`)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* 显示所有分类 */}
          {!activeCategoryId ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {categories.map(cat => (
                <div
                  key={cat.id}
                  onClick={() => selectCategory(cat.id)}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                  }}
                >
                  <div style={{ height: '180px', overflow: 'hidden' }}>
                    <img
                      src={cat.image}
                      alt={t(`categories.${cat.id}`)}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '12px', textAlign: 'center' }}>
                    <p style={{ fontWeight: '600', color: '#1f2937', fontSize: '14px' }}>
                      {t(`categories.${cat.id}`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : !activeSubId ? (
            // 显示子分类
            <div style={{ display: 'grid', gridTemplateColumns: activeCategoryId === 'health-supplements' ? 'repeat(6, 1fr)' : 'repeat(3, 1fr)', gap: '16px' }}>
              {activeCategoryId === 'health-supplements' ? (
                // 保健品的特殊处理：显示6个剂型
                [
                  { id: 'soft-chews', name: 'Soft Chews', nameZh: '软咀嚼' },
                  { id: 'powders', name: 'Powders', nameZh: '粉剂' },
                  { id: 'tablets', name: 'Tablets', nameZh: '片剂' },
                  { id: 'pastes', name: 'Pastes', nameZh: '膏剂' },
                  { id: 'capsules', name: 'Capsules', nameZh: '胶囊' },
                  { id: 'drops', name: 'Drops', nameZh: '滴剂' }
                ].map(form => (
                  <div
                    key={form.id}
                    onClick={() => { selectSub(form.id); }}
                    style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      backgroundColor: '#fff',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}
                  >
                    <div style={{ height: '160px', overflow: 'hidden' }}>
                      <img
                        src={getSubcategoryImage('health-supplements', form.id)}
                        alt={lang === 'zh' ? form.nameZh : form.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ padding: '12px', textAlign: 'center' }}>
                      <p style={{ fontWeight: '600', color: '#1f2937', fontSize: '13px' }}>
                        {lang === 'zh' ? form.nameZh : form.name}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                // 其他分类的子分类
                (currentCategory?.subcategories || []).map(sub => (
                  <div
                    key={sub.id}
                    onClick={() => { selectSub(sub.id); }}
                    style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      backgroundColor: '#fff',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}
                  >
                    <div style={{ height: '160px', overflow: 'hidden' }}>
                      <img
                        src={getSubcategoryImage(activeCategoryId, sub.id)}
                        alt={t(`subcategories.${sub.id}`)}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ padding: '12px', textAlign: 'center' }}>
                      <p style={{ fontWeight: '600', color: '#1f2937', fontSize: '13px' }}>
                        {t(`subcategories.${sub.id}`)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            // 显示具体产品
            <div>
              <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
                  {filteredProducts.length > 0 ? `${filteredProducts.length} 个产品` : '暂无产品'}
                </h2>
                <button
                  onClick={() => { setActiveSubId(''); setSearchParams({ category: activeCategoryId }); }}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#e5e7eb',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    color: '#374151',
                    fontSize: '13px'
                  }}
                >
                  返回子分类
                </button>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                  {filteredProducts.map(product => (
                    <div
                      key={product.id}
                      style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        backgroundColor: '#fff',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                      }}
                    >
                      <div style={{ height: '180px', overflow: 'hidden' }}>
                        <img
                          src={product.images[0]}
                          alt={getProductName(product)}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div style={{ padding: '16px' }}>
                        <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                          {getProductName(product)}
                        </h3>
                        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px', lineHeight: '1.5' }}>
                          {getProductDescription(product)}
                        </p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {product.isOEM && (
                            <span style={{
                              padding: '4px 10px',
                              backgroundColor: '#dbeafe',
                              color: '#1e40af',
                              borderRadius: '12px',
                              fontSize: '11px',
                              fontWeight: '500'
                            }}>
                              OEM
                            </span>
                          )}
                          {product.isODM && (
                            <span style={{
                              padding: '4px 10px',
                              backgroundColor: '#dcfce7',
                              color: '#166534',
                              borderRadius: '12px',
                              fontSize: '11px',
                              fontWeight: '500'
                            }}>
                              ODM
                            </span>
                          )}
                        </div>
                        <div style={{ marginTop: '12px' }}>
                          <button style={{
                            width: '100%',
                            padding: '10px 16px',
                            backgroundColor: '#2d5a27',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            fontSize: '14px'
                          }}>
                            {product.price || '询价'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', minHeight: '300px' }}>
                  <p style={{ color: '#9ca3af', fontSize: '16px' }}>
                    该子分类暂无产品
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
