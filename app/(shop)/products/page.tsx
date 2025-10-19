import { Suspense } from 'react';
import { api } from '@/lib/api';
import { ProductsContent } from '@/components/products/products-content';

export const revalidate = 60 * 60;
export const experimental_ppr = true;

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    api.getAllProducts(),
    api.getCategories(),
  ]);

  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-16">Loading products...</div>}>
      <ProductsContent products={products} categories={categories} />
    </Suspense>
  );
}
