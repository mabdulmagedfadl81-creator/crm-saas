'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const dynamic = 'force-dynamic';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">SalesCRM</h1>
        <p className="text-blue-100 mb-8">Loading...</p>
      </div>
    </div>
  );
}
