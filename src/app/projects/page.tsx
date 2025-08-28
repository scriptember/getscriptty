
import AiTitleForm from "@/components/ai-title-form";
import { Bot, FileCode2, Lightbulb } from "lucide-react";
import { generateProjectTitle } from "@/ai/flows/project-title-generator";
import { getTeams } from "@/services/data-service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProjectsPage() {
  const teams = await getTeams();

  // The 'createdAt' field from mock-data is a string, so we convert it to a Date object
  const teamsWithDates = teams.map(team => ({
      ...team,
      createdAt: new Date(team.createdAt),
  }));

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
        <AiTitleForm generateTitleAction={generateProjectTitle}/>
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
          {teams.length === 0 ? (
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
                {teamsWithDates.map((team) => (
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
