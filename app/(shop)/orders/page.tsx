import { Suspense } from 'react';
import { OrdersContent } from '@/components/orders/orders-content';

export const experimental_ppr = true;

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <OrdersContent />
    </Suspense>
  );
}
