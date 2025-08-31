import SponsorApplicationForm from "@/components/sponsor-application-form";
import { Handshake } from "lucide-react";

export default function ApplySponsorPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <div className="inline-block bg-primary/10 text-primary p-4 rounded-full mb-4">
            <Handshake className="h-10 w-10"/>
        </div>
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl text-primary">
          Become a Sponsor
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
          Partner with Scriptember and connect with a vibrant community of developers, builders, and innovators.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <SponsorApplicationForm />
      </div>
    </div>
  );
}
