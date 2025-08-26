import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import Logo from "./logo";

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21.12,2.46a1,1,0,0,0-1.07-.1L2.48,8.23a1,1,0,0,0-.2,1.82l4.1,1.64,1.64,4.1a1,1,0,0,0,1.82-.2L15.3,3.53a1,1,0,0,0-.1-1.07Z"/><path d="m8.19,10.22-4-1.64 12.83-5.83"/></svg>
);


export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40">
      <div className="container max-w-screen-2xl mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo />
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
             <p className="text-sm text-muted-foreground order-2 md:order-1">
                © {new Date().getFullYear()} Scriptember. All rights reserved.
             </p>
             <div className="flex items-center gap-4 order-1 md:order-2">
                <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
                <Link href="#" aria-label="GitHub">
                <Github className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
                <Link href="#" aria-label="Discord">
                <DiscordIcon className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
