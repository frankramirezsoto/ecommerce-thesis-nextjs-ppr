'use client';

import { useRouter } from 'next/navigation';
import { Star, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';
import { useCart } from '@/components/providers/cart-provider';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  return (
    <Card
      className="group overflow-hidden transition-all duration-300 hover:shadow-hover cursor-pointer"
      onClick={() => router.push(`/product/${product.id}`)}
    >
      <div className="aspect-square overflow-hidden bg-secondary/30">
        <Image
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold line-clamp-2 mb-2 min-h-[3rem]">{product.title}</h3>
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="text-sm font-medium">{product.rating.rate}</span>
          <span className="text-sm text-muted-foreground">({product.rating.count})</span>
        </div>
        <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
