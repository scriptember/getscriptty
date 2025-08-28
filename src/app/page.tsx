
import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/countdown-timer";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Rocket, Users } from "lucide-react";
import Image from "next/image";
import HeroSlideshow from "@/components/hero-slideshow";
import Link from "next/link";

export default function Home() {
  const sponsors = [
    { name: "Low-Cool Vibes", logo: "https://picsum.photos/seed/lowcool/128/40" },
    { name: "Sponsor 2", logo: "https://picsum.photos/seed/sponsor2/128/40" },
    { name: "Sponsor 3", logo: "https://picsum.photos/seed/sponsor3/128/40" },
    { name: "Sponsor 4", logo: "https://picsum.photos/seed/sponsor4/128/40" },
    { name: "Sponsor 5", logo: "https://picsum.photos/seed/sponsor5/128/40" },
    { name: "Sponsor 6", logo: "https://picsum.photos/seed/sponsor6/128/40" },
  ];

  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-20 md:py-32 lg:py-40 text-center bg-grid-slate-800/[0.2] relative overflow-hidden">
        <HeroSlideshow />
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-primary">
              Ship open-source magic this September.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              Join thousands of JS makers. Tackle real issues, learn fast, and
              grow your GitHub story.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild><Link href="/register">Register for Scriptember</Link></Button>
              <Button size="lg" variant="secondary">
                Join Discord
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/issues">Browse Issues</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <CountdownTimer />
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-2 text-muted-foreground md:text-lg">
              Participating is as easy as 1, 2, 3.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-background/50 border-border/50 text-center p-6 transition-transform transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 text-primary p-4 rounded-full">
                  <Code className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold font-headline">1. Register</h3>
              <p className="mt-2 text-muted-foreground">
                Sign up to get your participant pack and access to our Discord.
              </p>
            </Card>
            <Card className="bg-background/50 border-border/50 text-center p-6 transition-transform transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 text-primary p-4 rounded-full">
                  <Users className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold font-headline">2. Build</h3>
              <p className="mt-2 text-muted-foreground">
                Form a team or go solo. Pick a challenge and start building.
              </p>
            </Card>
            <Card className="bg-background/50 border-border/50 text-center p-6 transition-transform transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 text-primary p-4 rounded-full">
                  <Rocket className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold font-headline">3. Ship</h3>
              <p className="mt-2 text-muted-foreground">
                Submit your project by the deadline for a chance to win prizes.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-center font-headline text-2xl font-bold tracking-tighter text-muted-foreground mb-8">
            Proudly Sponsored By
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="relative h-10 w-32 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all">
                 <Image src={sponsor.logo} alt={sponsor.name} width={128} height={40} data-ai-hint="logo" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
