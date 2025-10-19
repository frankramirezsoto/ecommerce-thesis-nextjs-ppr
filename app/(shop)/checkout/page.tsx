import { Suspense } from 'react';
import { CheckoutContent } from '@/components/checkout/checkout-content';

export const experimental_ppr = true;

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
