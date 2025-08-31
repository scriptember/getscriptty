import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, Mail } from "lucide-react";
import Link from "next/link";

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
         <Card className="bg-card/50 border-border/50 text-center">
            <CardHeader>
                <CardTitle>Partner With Us</CardTitle>
                <CardDescription>
                    We offer a variety of sponsorship packages to fit your goals.
                    Reach out to our team to learn more about the opportunities available.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild size="lg">
                    <a href="mailto:sponsors@scriptember.example.com">
                        <Mail className="mr-2"/> Contact Us
                    </a>
                </Button>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
