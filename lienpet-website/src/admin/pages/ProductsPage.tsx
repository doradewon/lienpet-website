import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, ChevronDown, ChevronUp, Upload } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useI18n } from '@/i18n/I18nContext';
import { categories, type Product, type ProductTranslation } from '@/data/categories';

export function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const { lang } = useI18n();
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    subcategoryId: '',
    images: [] as string[],
    price: '',
    isOEM: false,
    isODM: false,
    translations: {} as Record<string, ProductTranslation>,
  });
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        categoryId: product.categoryId,
        subcategoryId: product.subcategoryId,
        images: [...product.images],
        price: product.price || '',
        isOEM: product.isOEM,
        isODM: product.isODM,
        translations: product.translations || {},
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        categoryId: categories[0]?.id || '',
        subcategoryId: categories[0]?.subcategories[0]?.id || '',
        images: [],
        price: '',
        isOEM: false,
        isODM: false,
        translations: {},
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || formData.images.length >= 10) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (formData.images.length < 10) {
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, result],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    if (formData.images.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleTranslationChange = (langKey: string, field: 'name' | 'description', value: string) => {
    setFormData((prev) => ({
      ...prev,
      translations: {
        ...prev.translations,
        [langKey]: {
          ...prev.translations[langKey],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || formData.images.length === 0) {
      return;
    }

    const productData = {
      name: formData.name,
      description: formData.description,
      categoryId: formData.categoryId,
      subcategoryId: formData.subcategoryId,
      images: formData.images,
      price: formData.price || undefined,
      isFavorite: false,
      isOEM: formData.isOEM,
      isODM: formData.isODM,
      links: [],
      translations: Object.keys(formData.translations).length > 0 ? formData.translations : undefined,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm(lang === 'en' ? 'Are you sure you want to delete this product?' : '确定要删除这个产品吗？')) {
      deleteProduct(id);
    }
  };

  const getCategoryName = (id: string) => {
    const category = categories.find((c) => c.id === id);
    return category?.name || id;
  };

  const getSubcategoryName = (categoryId: string, subcategoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    const subcategory = category?.subcategories.find((s) => s.id === subcategoryId);
    return subcategory?.name || subcategoryId;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">
            {lang === 'en' ? `Total: ${products.length} products` : `共 ${products.length} 个产品`}
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          {lang === 'en' ? 'Add Product' : '添加产品'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  {lang === 'en' ? 'Product' : '产品'}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  {lang === 'en' ? 'Category' : '分类'}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  {lang === 'en' ? 'Labels' : '标签'}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  {lang === 'en' ? 'Actions' : '操作'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <React.Fragment key={product.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-800">{product.name}</p>
                          <p className="text-sm text-gray-500 max-w-xs truncate">
                            {product.translations?.en?.name || ''}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">
                        {getCategoryName(product.categoryId)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {getSubcategoryName(product.categoryId, product.subcategoryId)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {product.isOEM && (
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                            OEM
                          </span>
                        )}
                        {product.isODM && (
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">
                            ODM
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                          title={lang === 'en' ? 'View Details' : '查看详情'}
                        >
                          {expandedProduct === product.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                        <button
                          onClick={() => handleOpenModal(product)}
                          className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                          title={lang === 'en' ? 'Edit' : '编辑'}
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                          title={lang === 'en' ? 'Delete' : '删除'}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedProduct === product.id && (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">
                              {lang === 'en' ? 'Description' : '产品描述'}
                            </h4>
                            <p className="text-sm text-gray-600">{product.description}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">
                              {lang === 'en' ? 'English Description' : '英文描述'}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {product.translations?.en?.description || '-'}
                            </p>
                          </div>
                          <div className="md:col-span-2">
                            <h4 className="font-medium text-gray-700 mb-2">
                              {lang === 'en' ? 'Images' : '图片'} ({product.images.length})
                            </h4>
                            <div className="flex gap-2 overflow-x-auto pb-2">
                              {product.images.map((img, index) => (
                                <img
                                  key={index}
                                  src={img}
                                  alt={`${product.name} ${index + 1}`}
                                  className="w-20 h-20 rounded-lg object-cover"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        {products.length === 0 && (
          <div className="px-6 py-12 text-center text-gray-500">
            {lang === 'en' ? 'No products yet. Click "Add Product" to create one.' : '暂无产品，点击"添加产品"创建'}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                {editingProduct ? (lang === 'en' ? 'Edit Product' : '编辑产品') : (lang === 'en' ? 'Add Product' : '添加产品')}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'en' ? 'Product Name (Chinese)' : '产品名称（中文）'} *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'en' ? 'Product Name (English)' : '产品名称（英文）'}
                  </label>
                  <input
                    type="text"
                    value={formData.translations.en?.name || ''}
                    onChange={(e) => handleTranslationChange('en', 'name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'en' ? 'Description (Chinese)' : '产品描述（中文）'} *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'en' ? 'Description (English)' : '产品描述（英文）'}
                  </label>
                  <textarea
                    value={formData.translations.en?.description || ''}
                    onChange={(e) => handleTranslationChange('en', 'description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'en' ? 'Category' : '分类'} *
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => {
                      const categoryId = e.target.value;
                      const category = categories.find((c) => c.id === categoryId);
                      setFormData((prev) => ({
                        ...prev,
                        categoryId,
                        subcategoryId: category?.subcategories[0]?.id || '',
                      }));
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'en' ? 'Subcategory' : '细分品类'} *
                  </label>
                  <select
                    value={formData.subcategoryId}
                    onChange={(e) => setFormData((prev) => ({ ...prev, subcategoryId: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    {categories
                      .find((c) => c.id === formData.categoryId)
                      ?.subcategories.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {lang === 'en' ? 'Images' : '图片'} * ({formData.images.length}/10)
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Image ${index + 1}`}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      {formData.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                      {index === 0 && (
                        <span className="absolute bottom-1 left-1 text-xs bg-black/50 text-white px-1 rounded">
                          {lang === 'en' ? 'Main' : '主图'}
                        </span>
                      )}
                    </div>
                  ))}
                  {formData.images.length < 10 && (
                    <label className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                      <Upload className="w-5 h-5 text-gray-400" />
                      <span className="text-xs text-gray-400 mt-1">
                        {lang === 'en' ? 'Add' : '添加'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {lang === 'en' ? 'First image is the main image. Max 10 images allowed.' : '第一张图为主图，最多上传10张图片'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'en' ? 'Price' : '价格'}
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                    placeholder={lang === 'en' ? 'e.g. Contact for price' : '如：询价'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center gap-4 pt-5">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isOEM}
                      onChange={(e) => setFormData((prev) => ({ ...prev, isOEM: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">OEM</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isODM}
                      onChange={(e) => setFormData((prev) => ({ ...prev, isODM: e.target.checked }))}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">ODM</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {lang === 'en' ? 'Cancel' : '取消'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingProduct ? (lang === 'en' ? 'Update' : '更新') : (lang === 'en' ? 'Add' : '添加')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
