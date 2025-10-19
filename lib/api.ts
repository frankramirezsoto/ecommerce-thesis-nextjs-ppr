import { Product } from '@/types';

const API_BASE = 'https://fakestoreapi.com';

const defaultRevalidate = 60 * 60; // 1 hour

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  return (await response.json()) as T;
}

export const api = {
  getAllProducts: async (): Promise<Product[]> => {
    const res = await fetch(`${API_BASE}/products`, {
      next: { revalidate: defaultRevalidate, tags: ['products'] },
    });
    return handleResponse<Product[]>(res);
  },

  getProductById: async (id: string): Promise<Product> => {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      next: { revalidate: defaultRevalidate, tags: [`product-${id}`] },
    });
    return handleResponse<Product>(res);
  },

  getCategories: async (): Promise<string[]> => {
    const res = await fetch(`${API_BASE}/products/categories`, {
      next: { revalidate: defaultRevalidate, tags: ['categories'] },
    });
    return handleResponse<string[]>(res);
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const res = await fetch(`${API_BASE}/products/category/${category}`, {
      next: { revalidate: defaultRevalidate, tags: [`category-${category}`] },
    });
    return handleResponse<Product[]>(res);
  },
};
