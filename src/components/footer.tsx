import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import Logo from "./logo";

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5.25,11.25,2.75,9.5,21.25,2.5,14.5,21.25,12.75,13.25"/><polygon points="21.25 2.5 12.75 13.25 18.25 18.25 21.25 2.5"/></svg>
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
