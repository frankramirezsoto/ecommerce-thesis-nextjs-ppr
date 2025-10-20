import { HomeContent } from '@/components/home/home-content';
import { api } from '@/lib/api';
import type { Product } from '@/types';

export const revalidate = 3600;
export const experimental_ppr = true;

function pickFeatured(products: Product[]): Product[] {
  if (products.length <= 4) {
    return products;
  }

  const shuffled = [...products];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 4);
}

export default async function HomePage() {
  const products = await api.getAllProducts();
  const featuredProducts = pickFeatured(products);

  return <HomeContent featuredProducts={featuredProducts} />;
}
