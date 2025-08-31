
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { getSponsors } from "@/services/data-service";

const SponsorTier = async ({ tier, sizeClass }: { tier: string; sizeClass: string }) => {
  const sponsors = await getSponsors();
  const logos = sponsors[tier.toLowerCase() as keyof typeof sponsors] || [];

  return (
    <div className="mb-16">
      <h2 className={cn("font-headline text-3xl font-bold mb-8 text-center",
          tier === "Gold" && "text-yellow-400",
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
                      width={parseInt(sizeClass.split(' ')[0].split('-')[1]) * 4}
                      height={parseInt(sizeClass.split(' ')[1].split('-')[1]) * 4}
                      data-ai-hint="logo"
                  />
              </CardContent>
            </Card>
          </Link>
        ))}
         <Link href="/onboarding/apply-sponsor" className="h-full">
            <Card className={cn("p-6 bg-card/50 border-dashed border-border/50 transition-all hover:shadow-lg hover:border-primary/50 hover:scale-105 flex items-center justify-center", sizeClass)}>
                <div className="flex flex-col items-center justify-center">
                    <Plus className="h-16 w-16 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
            </Card>
          </Link>
          {[...Array(2)].map((_, i) => (
              <Card key={i} className={cn("p-6 bg-card/50 border-dashed border-border/50", sizeClass)}>
              </Card>
         ))}
      </div>
    </div>
  )
};

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

      <SponsorTier tier="Gold" sizeClass="w-64 h-32" />
    </div>
  );
}
