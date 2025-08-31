
"use client";

import * as React from "react";
import AiTitleForm from "@/components/ai-title-form";
import { Bot, FileCode2, Lightbulb } from "lucide-react";
import { getTeams, type Team } from "@/services/data-service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsPage() {
  const [teams, setTeams] = React.useState<Team[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadTeams() {
      setIsLoading(true);
      const fetchedTeams = await getTeams();
      setTeams(fetchedTeams);
      setIsLoading(false);
    }
    loadTeams();
  }, []);

  // This placeholder action is for the AiTitleForm, which is not fully implemented in static export mode.
  const generateTitleAction = async (input: { tags: string[] }) => {
    console.log("AI title generation called with:", input.tags);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { title: `Awesome ${input.tags.join(" ")} Project` };
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <div className="inline-block bg-primary/10 text-primary p-4 rounded-full mb-4">
            <Bot className="h-10 w-10"/>
        </div>
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl text-primary">
          AI Project Title Generator
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
          Stuck on a name for your project? Use our GenAI tool to brainstorm creative and descriptive titles based on your project's tags and technologies.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <AiTitleForm generateTitleAction={generateTitleAction}/>
      </div>

      <div className="mt-20">
         <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Submitted Projects
            </h2>
            <p className="mt-2 text-muted-foreground md:text-lg">
              See what other teams are building.
            </p>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="flex flex-col bg-card/50 border-border/50">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-12 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : teams.length === 0 ? (
             <Alert className="max-w-xl mx-auto">
                <FileCode2 className="h-4 w-4" />
                <AlertTitle>No Projects Submitted Yet!</AlertTitle>
                <AlertDescription>
                    Be the first to create a team and your project will show up here.
                    <Button asChild variant="link" className="p-0 h-auto ml-1">
                        <Link href="/onboarding/create-team">Create a Team</Link>
                    </Button>
                </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teams.map((team) => (
                    <Card key={team.id} className="flex flex-col bg-card/50 border-border/50 transition-all hover:shadow-lg hover:border-primary/50">
                        <CardHeader>
                            <CardTitle className="text-xl text-foreground">{team.name}</CardTitle>
                             <CardDescription>
                                Submitted {formatDistanceToNow(team.createdAt, { addSuffix: true })}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                           <div className="flex items-start gap-3">
                            <Lightbulb className="h-5 w-5 mt-1 text-primary"/>
                            <p className="text-muted-foreground">{team.projectIdea}</p>
                           </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
          )}
      </div>

    </div>
  );
}
