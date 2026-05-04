import { useStore } from '@/store/useStore';

export default function TestPage() {
  const { products } = useStore();
  
  return (
    <div style={{ padding: '40px', backgroundColor: '#fff', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        测试页面 - 产品数量: {products.length}
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '16px',
            backgroundColor: '#f9fafb'
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
              {product.name}
            </h3>
            <p style={{ fontSize: '12px', color: '#6b7280' }}>
              ID: {product.id}
            </p>
            <p style={{ fontSize: '12px', color: '#6b7280' }}>
              分类: {product.categoryId} → {product.subcategoryId}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
