import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Product, Message } from '@/data/categories';
import { sampleProducts } from '@/data/categories';
import { translations } from '@/i18n/translations';
import type { Language } from '@/i18n/translations';

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
}

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [messages, setMessages] = useState<Message[]>([]);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

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
  }, []);

  const getFavorites = useCallback(() => {
    return products.filter(p => p.isFavorite);
  }, [products]);

  const addMessage = useCallback((msg: Omit<Message, 'id' | 'createdAt'>) => {
    const newMsg: Message = {
      ...msg,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMsg]);
    const lang = (localStorage.getItem('lienpet-lang') as Language) || 'en';
    addToast(translations[lang].toast.feedbackSubmitted);
  }, [addToast]);

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: 'p' + Date.now(),
    };
    setProducts(prev => [...prev, newProduct]);
    const lang = (localStorage.getItem('lienpet-lang') as Language) || 'en';
    addToast(translations[lang].toast.productAdded);
  }, [addToast]);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
    const lang = (localStorage.getItem('lienpet-lang') as Language) || 'en';
    addToast(translations[lang].toast.productUpdated);
  }, [addToast]);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    const lang = (localStorage.getItem('lienpet-lang') as Language) || 'en';
    addToast(translations[lang].toast.productDeleted);
  }, [addToast]);

  return (
    <StoreContext.Provider
      value={{
        products, setProducts, toggleFavorite, getFavorites,
        messages, addMessage, addProduct, updateProduct, deleteProduct,
        toasts, addToast,
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