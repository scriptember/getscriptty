
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/logo';
import Link from 'next/link';

export default function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/'); // Redirect to homepage after 3 seconds
    }, 3000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="animate-pulse">
        <Logo />
      </div>
      <h1 className="mt-8 text-2xl font-bold text-primary">404 - Page Not Found</h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Redirecting you home...
      </p>
       <Link href="/" className="mt-8 text-sm text-muted-foreground hover:text-primary underline">
            Or click here to go back now
       </Link>
    </div>
  );
}
