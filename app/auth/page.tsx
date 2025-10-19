import { Suspense } from 'react';
import { AuthContent } from '@/components/auth/auth-content';

export const experimental_ppr = true;

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}
