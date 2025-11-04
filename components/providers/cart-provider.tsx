'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { storage } from '@/lib/storage';
import type { CartItem, Product } from '@/types';
import { toast } from '@/hooks/use-toast';
import { useAuth } from './auth-provider';

interface CartContextValue {
  items: CartItem[];
  itemsCount: number;
  subtotal: number;
  hydrated: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, options?: { openDrawer?: boolean }) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user, hydrated: authHydrated } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cartHydrated, setCartHydrated] = useState(false);

  useEffect(() => {
    setItems(storage.getCart());
    setCartHydrated(true);
  }, []);

  useEffect(() => {
    if (!cartHydrated) return;
    storage.saveCart(items);
  }, [items, cartHydrated]);

  useEffect(() => {
    if (!authHydrated) return;

    if (!user) {
      setItems([]);
      storage.clearCart();
    }
  }, [authHydrated, user]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const addToCart = useCallback(
    (product: Product, options?: { openDrawer?: boolean }) => {
      if (!user) {
        toast({
          title: 'Please login',
          description: 'You need to login to add items to cart',
          variant: 'destructive',
        });
        return;
      }

      setItems((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });

      toast({
        title: 'Added to cart',
        description: `${product.title} has been added to your cart`,
      });
      if (options?.openDrawer ?? true) {
        openCart();
      }
    },
    [openCart, user]
  );

  const updateQuantity = useCallback((id: number, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: 'Removed from cart',
      description: 'Item has been removed from your cart',
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    storage.clearCart();
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return {
      items,
      itemsCount,
      subtotal,
      hydrated: cartHydrated,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
    };
  }, [items, cartHydrated, isOpen, openCart, closeCart, toggleCart, addToCart, updateQuantity, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
