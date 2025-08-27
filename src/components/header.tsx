
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./logo";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/schedule", label: "Schedule" },
  { href: "/challenges", label: "Challenges" },
  { href: "/issues", label: "Issues" },
  { href: "/mentors", label: "Mentors" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/faq", label: "FAQ" },
  { href: "/projects", label: "Projects" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a static build, we can't check auth state.
    // We'll default to a logged-out state.
    setIsLoggedIn(false);
    setIsLoading(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "transition-colors hover:text-primary",
                  pathname === href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
             <Link href="/" className="md:hidden flex items-center space-x-2">
                <Logo />
            </Link>
            <Button className="md:hidden absolute top-2.5 right-16" variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X/> : <Menu/>}
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </div>
          <nav className="flex items-center">
             {!isLoading && (
              <>
                {isLoggedIn ? (
                  <Button variant="secondary" onClick={() => {}}>Logout</Button>
                ) : (
                  <Button asChild>
                    <Link href="/register">Register</Link>
                  </Button>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
       {isMenuOpen && (
        <div className="md:hidden">
          <div className="container py-4">
            <nav className="grid gap-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "transition-colors hover:text-primary py-2 text-lg",
                    pathname === href ? "text-primary" : "text-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
