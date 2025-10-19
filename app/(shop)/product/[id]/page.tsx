import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { api } from '@/lib/api';
import { ProductDetailContent } from '@/components/products/product-detail-content';

export const revalidate = 60 * 60;
export const experimental_ppr = true;

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const product = await api.getProductById(id).catch(() => null);

  if (!product) {
    notFound();
  }

  const resolvedProduct = product;

  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-16">Loading product...</div>}>
      <ProductDetailContent product={resolvedProduct} />
    </Suspense>
  );
}
