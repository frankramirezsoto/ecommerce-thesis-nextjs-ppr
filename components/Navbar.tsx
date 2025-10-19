'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, User, LogOut, Search, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/components/providers/cart-provider';
import { useAuth } from '@/components/providers/auth-provider';

export function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { itemsCount, openCart } = useCart();

  const handleLogout = () => {
    logout();
    router.push('/auth');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-xl">
            <Store className="h-6 w-6 text-primary" />
            <span>ShopHub</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/products')}
              className="hidden sm:inline-flex"
            >
              <Search className="h-5 w-5" />
            </Button>

            {user ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push('/orders')}
                  className="hidden sm:inline-flex"
                >
                  <User className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={openCart} className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {itemsCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {itemsCount}
                    </Badge>
                  )}
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button onClick={() => router.push('/auth')}>Login</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
