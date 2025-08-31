"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/logo';

export default function RedirectingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/'); // Redirect to homepage after 3 seconds
    }, 3000); // 3-second interval

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="animate-pulse">
        <Logo />
      </div>
      <p className="mt-4 text-lg text-muted-foreground">
        Redirecting...
      </p>
    </div>
  );
}
