'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ShoppingBag, Sparkles, TrendingUp } from 'lucide-react';
import type { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

interface HomeContentProps {
  featuredProducts: Product[];
}

export function HomeContent({ featuredProducts }: HomeContentProps) {
  const router = useRouter();

  const categories = useMemo(
    () => [
      { name: "Men's Fashion", path: "men's clothing", icon: ShoppingBag },
      { name: "Women's Fashion", path: "women's clothing", icon: Sparkles },
      { name: 'Electronics', path: 'electronics', icon: TrendingUp },
      { name: 'Jewelry', path: 'jewelery', icon: Sparkles },
    ],
    []
  );

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAxMmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="container mx-auto px-4 py-20 sm:py-32 relative">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">Discover Your Style</h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8">
              Explore our curated collection of premium products with unbeatable prices
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => router.push('/products')}
                className="group"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30"
              >
                View Deals
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.path}
                  className="group cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => router.push(`/products?category=${encodeURIComponent(category.path)}`)}
                >
                  <div className="bg-card rounded-lg p-6 text-center transition-all hover:shadow-hover border">
                    <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold">{category.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button variant="ghost" onClick={() => router.push('/products')}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-accent to-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-accent-foreground">Special Offer!</h2>
            <p className="text-lg mb-6 text-accent-foreground/80">
              Sign up today and get exclusive access to member-only deals and promotions
            </p>
            <Button size="lg" onClick={() => router.push('/auth')}>
              Get Started
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
