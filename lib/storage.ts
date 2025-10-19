import { CartItem, Order, User } from '@/types';

const CART_KEY = 'ecommerce_cart';
const ORDERS_KEY = 'ecommerce_orders';
const USER_KEY = 'ecommerce_user';

const isBrowser = () => typeof window !== 'undefined';

const safeParse = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.warn('Failed to parse storage value', error);
    return fallback;
  }
};

export const storage = {
  // Cart
  getCart: (): CartItem[] => {
    if (!isBrowser()) return [];
    return safeParse<CartItem[]>(localStorage.getItem(CART_KEY), []);
  },

  saveCart: (cart: CartItem[]): void => {
    if (!isBrowser()) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  },

  clearCart: (): void => {
    if (!isBrowser()) return;
    localStorage.removeItem(CART_KEY);
  },

  // Orders
  getOrders: (): Order[] => {
    if (!isBrowser()) return [];
    return safeParse<Order[]>(localStorage.getItem(ORDERS_KEY), []);
  },

  saveOrder: (order: Order): void => {
    if (!isBrowser()) return;
    const orders = storage.getOrders();
    orders.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  },

  // User
  getUser: (): User | null => {
    if (!isBrowser()) return null;
    return safeParse<User | null>(localStorage.getItem(USER_KEY), null);
  },

  saveUser: (user: User): void => {
    if (!isBrowser()) return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clearUser: (): void => {
    if (!isBrowser()) return;
    localStorage.removeItem(USER_KEY);
  },
};
