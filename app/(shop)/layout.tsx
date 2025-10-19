import { Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';

export const experimental_ppr = true;

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>{children}</main>
      <Suspense fallback={null}>
        <CartDrawer />
      </Suspense>
    </div>
  );
}
