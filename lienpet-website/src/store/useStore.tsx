import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Product, Message } from '@/data/categories';
import { sampleProducts } from '@/data/categories';
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
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [messages, setMessages] = useState<Message[]>([]);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isLoading] = useState(false);
  const [dbConnected, setDbConnected] = useState(false);

  useEffect(() => {
    const loadFromDb = async () => {
      try {
        const productsResult = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (productsResult.data && productsResult.data.length > 0) {
          const mappedProducts = productsResult.data.map((p: any) => ({
            ...p,
            id: p.id.toString(),
            images: p.images ? JSON.parse(p.images) : [],
            links: p.links ? JSON.parse(p.links) : [],
            translations: p.translations ? JSON.parse(p.translations) : undefined,
            isFavorite: p.is_favorite || false,
          }));
          setProducts(mappedProducts);
          setDbConnected(true);
        }

        const messagesResult = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false });

        if (messagesResult.data && messagesResult.data.length > 0) {
          const mappedMessages = messagesResult.data.map((m: any) => ({
            ...m,
            id: m.id.toString(),
          }));
          setMessages(mappedMessages);
        }
      } catch (error) {
        console.log('Using local data, Supabase not connected');
      }
    };

    loadFromDb();
  }, []);

  useEffect(() => {
    if (!dbConnected) return;

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

    const messagesSubscription = supabase
      .channel('messages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, async (payload) => {
        const newData = payload.new as { id: number };
        const { data } = await supabase.from('messages').select('*').eq('id', newData.id).single();
        if (data) {
          const mappedMessage = {
            ...data,
            id: data.id.toString(),
          };
          setMessages(prev => [...prev, mappedMessage]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(productsSubscription);
      supabase.removeChannel(messagesSubscription);
    };
  }, [dbConnected]);

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
    if (dbConnected) {
      (async () => {
        try {
          await supabase.from('products').update({
            is_favorite: true,
            updated_at: new Date().toISOString(),
          }).eq('id', productId);
        } catch (e) {
          console.log('Supabase update failed');
        }
      })();
    }
  }, [dbConnected]);

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
    if (dbConnected) {
      (async () => {
        try {
          await supabase.from('messages').insert({
            ...msg,
            created_at: newMsg.createdAt,
          });
        } catch (e) {
          console.log('Supabase insert failed');
        }
      })();
    }
    addToast('Message submitted successfully!');
  }, [dbConnected, addToast]);

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: 'p' + Date.now(),
    };
    setProducts(prev => [...prev, newProduct]);
    if (dbConnected) {
      (async () => {
        try {
          await supabase.from('products').insert({
            ...product,
            images: JSON.stringify(product.images),
            links: JSON.stringify(product.links),
            translations: product.translations ? JSON.stringify(product.translations) : null,
            is_favorite: product.isFavorite,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        } catch (e) {
          console.log('Supabase insert failed');
        }
      })();
    }
    addToast('Product added successfully!');
  }, [dbConnected, addToast]);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
    if (dbConnected) {
      (async () => {
        try {
          const updateData: Record<string, any> = {
            ...updates,
            updated_at: new Date().toISOString(),
          };
          if (updates.images) updateData.images = JSON.stringify(updates.images);
          if (updates.links) updateData.links = JSON.stringify(updates.links);
          if (updates.translations) updateData.translations = JSON.stringify(updates.translations);
          if (updates.isFavorite !== undefined) updateData.is_favorite = updates.isFavorite;
          await supabase.from('products').update(updateData).eq('id', id);
        } catch (e) {
          console.log('Supabase update failed');
        }
      })();
    }
    addToast('Product updated successfully!');
  }, [dbConnected, addToast]);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    if (dbConnected) {
      (async () => {
        try {
          await supabase.from('products').delete().eq('id', id);
        } catch (e) {
          console.log('Supabase delete failed');
        }
      })();
    }
    addToast('Product deleted successfully!');
  }, [dbConnected, addToast]);

  return (
    <StoreContext.Provider
      value={{
        products, setProducts, toggleFavorite, getFavorites,
        messages, addMessage, addProduct, updateProduct, deleteProduct,
        toasts, addToast, isLoading,
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