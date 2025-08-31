
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Globe, Briefcase, Users, Plus } from "lucide-react";
import { getMentors } from "@/services/data-service";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

export default async function MentorsPage() {
  const mentors = await getMentors();

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl text-primary">
          Meet the Mentors
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          Our experts are here to help you succeed.
        </p>
      </div>

      {mentors.length === 0 ? (
          <Alert className="max-w-xl mx-auto">
            <Users className="h-4 w-4" />
            <AlertTitle>No Mentors Found</AlertTitle>
            <AlertDescription>
                This page is ready. Mentors will appear here once they are added to the mock data store.
            </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mentors.map((mentor) => (
            <Card key={mentor.id} className="flex flex-col text-center bg-card/50 border-border/50 transition-all hover:shadow-lg hover:border-primary/50 transform hover:-translate-y-1">
                <CardHeader className="items-center">
                <Image
                    src={mentor.avatar}
                    alt={mentor.name}
                    width={100}
                    height={100}
                    className="rounded-full border-2 border-primary"
                    data-ai-hint="profile avatar"
                />
                <CardTitle className="pt-4 text-xl">{mentor.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                <CardDescription>{mentor.bio}</CardDescription>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {mentor.expertise.map((skill, i) => (
                    <Badge key={i} variant="secondary">{skill}</Badge>
                    ))}
                </div>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                <Button variant="outline" className="w-full">
                    <Briefcase className="mr-2 h-4 w-4" /> View Office Hours
                </Button>
                <div className="flex gap-4">
                    {mentor.githubUrl && (
                        <Link href={mentor.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                        </Link>
                    )}
                    {mentor.websiteUrl && (
                        <Link href={mentor.websiteUrl} target="_blank" rel="noopener noreferrer">
                            <Globe className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                        </Link>
                    )}
                </div>
                </CardFooter>
            </Card>
            ))}
             <Link href="/onboarding/apply-mentor" className="h-full">
                <Card className="flex flex-col text-center bg-card/50 border-dashed border-border/50 transition-all hover:shadow-lg hover:border-primary/50 transform hover:-translate-y-1 h-full items-center justify-center">
                    <div className="flex flex-col items-center justify-center p-6">
                        <Plus className="h-16 w-16 text-muted-foreground transition-colors group-hover:text-primary" />
                        <p className="mt-4 text-muted-foreground font-semibold">Apply to be a Mentor</p>
                    </div>
                </Card>
            </Link>
            {[...Array(2)].map((_, i) => (
                 <Card key={i} className="flex flex-col text-center bg-card/50 border-dashed border-border/50 h-full items-center justify-center">
                 </Card>
            ))}
        </div>
      )}
    </div>
  );
}
