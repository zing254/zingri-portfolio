'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return null;
  return <>{children}</>;
}
