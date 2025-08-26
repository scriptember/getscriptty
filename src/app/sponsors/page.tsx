import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

const sponsors = {
  gold: [
    { name: "Gold Sponsor 1", logoUrl: "https://picsum.photos/seed/g1/250/120", site: "#" },
    { name: "Gold Sponsor 2", logoUrl: "https://picsum.photos/seed/g2/250/120", site: "#" },
  ],
  silver: [
    { name: "Silver Sponsor 1", logoUrl: "https://picsum.photos/seed/s1/200/100", site: "#" },
    { name: "Silver Sponsor 2", logoUrl: "https://picsum.photos/seed/s2/200/100", site: "#" },
    { name: "Silver Sponsor 3", logoUrl: "https://picsum.photos/seed/s3/200/100", site: "#" },
  ],
  bronze: [
    { name: "Low-Cool Vibes", logoUrl: "https://fireworks.so/api/proxy?url=https://storage.googleapis.com/stabl-agent-test-assets/lowcoolvibes.jpeg", site: "#" },
    { name: "Bronze Sponsor 2", logoUrl: "https://picsum.photos/seed/b2/150/80", site: "#" },
    { name: "Bronze Sponsor 3", logoUrl: "https://picsum.photos/seed/b3/150/80", site: "#" },
    { name: "Bronze Sponsor 4", logoUrl: "https://picsum.photos/seed/b4/150/80", site: "#" },
  ],
};

const SponsorTier = ({ tier, logos, sizeClass }: { tier: string; logos: {name: string, logoUrl: string, site: string}[], sizeClass: string }) => (
  <div className="mb-16">
    <h2 className={cn("font-headline text-3xl font-bold mb-8 text-center", 
        tier === "Gold" && "text-yellow-400",
        tier === "Silver" && "text-slate-400",
        tier === "Bronze" && "text-yellow-700",
    )}>
      {tier} Sponsors
    </h2>
    <div className="flex flex-wrap items-center justify-center gap-8">
      {logos.map((sponsor) => (
        <Link key={sponsor.name} href={sponsor.site} target="_blank" rel="noopener noreferrer">
          <Card className="p-6 bg-card/50 border-border/50 transition-all hover:shadow-lg hover:border-primary/50 hover:scale-105 grayscale hover:grayscale-0 opacity-75 hover:opacity-100">
            <CardContent className={cn("relative", sizeClass)}>
                <Image
                    src={sponsor.logoUrl}
                    alt={`${sponsor.name} logo`}
                    layout="fill"
                    objectFit="contain"
                    data-ai-hint="logo"
                />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  </div>
);

export default function SponsorsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl text-primary">
          Our Sponsors
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          This event is made possible by our amazing partners.
        </p>
      </div>

      <SponsorTier tier="Gold" logos={sponsors.gold} sizeClass="w-64 h-32" />
      <SponsorTier tier="Silver" logos={sponsors.silver} sizeClass="w-52 h-28" />
      <SponsorTier tier="Bronze" logos={sponsors.bronze} sizeClass="w-40 h-20" />
    </div>
  );
}
