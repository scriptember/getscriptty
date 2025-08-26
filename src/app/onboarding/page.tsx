import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl text-primary">
          Welcome to Scriptember!
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
          You're all signed up. What would you like to do next?
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-card/50 border-border/50 transition-all hover:shadow-lg hover:border-primary/50">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                <Users className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl text-foreground">Create a Team</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-6">
              Hackathons are better with friends. Assemble your dream team and get ready to build something amazing together. You can invite up to 3 other members.
            </CardDescription>
            <Button asChild>
              <Link href="/onboarding/create-team">
                Create a Team <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50 transition-all hover:shadow-lg hover:border-primary/50">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                <UserCheck className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl text-foreground">Become a Mentor</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-6">
              Have experience to share? Apply to become a mentor and help guide other participants through the hackathon. Your expertise can make a huge difference.
            </CardDescription>
            <Button asChild>
              <Link href="/onboarding/apply-mentor">
                Apply to be a Mentor <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
       <div className="text-center mt-12">
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary underline">
                Skip for now, I'll decide later
            </Link>
        </div>
    </div>
  );
}
