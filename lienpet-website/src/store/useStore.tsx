import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import type { Product, Message } from '@/data/categories';
import { sampleProducts } from '@/data/categories';
import { translations } from '@/i18n/translations';
import type { Language } from '@/i18n/translations';
import { supabase } from '@/lib/supabase';

interface StoreContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  toggleFavorite: (productId: string) => void;
  getFavorites: () => Product[];
  messages: Message[];
  addMessage: (msg: Omit<Message, 'id' | 'createdAt'>) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toasts: ToastItem[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  isLoading: boolean;
}

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const loadData = async () => {
      try {
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (productsError) {
          console.warn('Failed to load products from Supabase, using local data:', productsError);
          setProducts(sampleProducts);
          setIsLoading(false);
          return;
        }

        if (productsData && productsData.length > 0) {
          const mappedProducts = productsData.map((p: any) => ({
            ...p,
            id: p.id.toString(),
            images: p.images ? JSON.parse(p.images) : [],
            links: p.links ? JSON.parse(p.links) : [],
            translations: p.translations ? JSON.parse(p.translations) : undefined,
            isFavorite: p.is_favorite || false,
          }));
          setProducts(mappedProducts);
        } else {
          await supabase.from('products').insert(
            sampleProducts.map(p => ({
              ...p,
              images: JSON.stringify(p.images),
              links: JSON.stringify(p.links),
              translations: p.translations ? JSON.stringify(p.translations) : null,
              is_favorite: p.isFavorite,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }))
          );
          setProducts(sampleProducts);
        }

        const { data: messagesData } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false });

        if (messagesData) {
          const mappedMessages = messagesData.map((m: any) => ({
            ...m,
            id: m.id.toString(),
          }));
          setMessages(mappedMessages);
        }
      } catch (error) {
        console.warn('Error loading data:', error);
        setProducts(sampleProducts);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const productsSubscription = supabase
      .channel('products')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, async (payload) => {
        const newData = payload.new as { id: number };
        const { data } = await supabase.from('products').select('*').eq('id', newData.id).single();
        if (data) {
          const mappedProduct = {
            ...data,
            id: data.id.toString(),
            images: data.images ? JSON.parse(data.images) : [],
            links: data.links ? JSON.parse(data.links) : [],
            translations: data.translations ? JSON.parse(data.translations) : undefined,
            isFavorite: data.is_favorite || false,
          };
          setProducts(prev => {
            const index = prev.findIndex(p => p.id === mappedProduct.id);
            if (index >= 0) {
              return prev.map((p, i) => i === index ? mappedProduct : p);
            }
            return [...prev, mappedProduct];
          });
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(productsSubscription);
    };
  }, []);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const toggleFavorite = useCallback((productId: string) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
    supabase.from('products').update({
      is_favorite: true,
      updated_at: new Date().toISOString(),
    }).eq('id', productId);
  }, []);

  const getFavorites = useCallback(() => {
    return products.filter(p => p.isFavorite);
  }, [products]);

  const getToastMessage = (key: 'feedbackSubmitted' | 'productAdded' | 'productUpdated' | 'productDeleted') => {
    const lang = (localStorage.getItem('lienpet-lang') as Language) || 'en';
    const langTranslations = translations[lang] as unknown as Record<string, unknown>;
    const toast = langTranslations['toast'] as Record<string, string> | undefined;
    if (toast && toast[key]) {
      return toast[key];
    }
    return translations.en.toast[key];
  };

  const addMessage = useCallback(async (msg: Omit<Message, 'id' | 'createdAt'>) => {
    const newMsg: Message = {
      ...msg,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMsg]);
    await supabase.from('messages').insert({
      ...msg,
      created_at: newMsg.createdAt,
    });
    addToast(getToastMessage('feedbackSubmitted'));
  }, [addToast]);

  const addProduct = useCallback(async (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: 'p' + Date.now(),
    };
    setProducts(prev => [...prev, newProduct]);
    await supabase.from('products').insert({
      ...product,
      images: JSON.stringify(product.images),
      links: JSON.stringify(product.links),
      translations: product.translations ? JSON.stringify(product.translations) : null,
      is_favorite: product.isFavorite,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    addToast(getToastMessage('productAdded'));
  }, [addToast]);

  const updateProduct = useCallback(async (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
    const updateData: Record<string, any> = {
      ...updates,
      updated_at: new Date().toISOString(),
    };
    if (updates.images) updateData.images = JSON.stringify(updates.images);
    if (updates.links) updateData.links = JSON.stringify(updates.links);
    if (updates.translations) updateData.translations = JSON.stringify(updates.translations);
    if (updates.isFavorite !== undefined) updateData.is_favorite = updates.isFavorite;
    await supabase.from('products').update(updateData).eq('id', id);
    addToast(getToastMessage('productUpdated'));
  }, [addToast]);

  const deleteProduct = useCallback(async (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    await supabase.from('products').delete().eq('id', id);
    addToast(getToastMessage('productDeleted'));
  }, [addToast]);

  return (
    <StoreContext.Provider
      value={{
        products, setProducts, toggleFavorite, getFavorites,
        messages, addMessage, addProduct, updateProduct, deleteProduct,
        toasts, addToast,
        isLoading,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
