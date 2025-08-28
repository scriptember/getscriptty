
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Target, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { getChallenges } from "@/services/data-service";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Rocket } from "lucide-react";

export default async function ChallengesPage() {
  const challenges = await getChallenges();

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl text-primary">
          Challenges
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          Pick a challenge, build something awesome, and win prizes.
        </p>
      </div>

      {challenges.length === 0 ? (
        <Alert className="max-w-xl mx-auto">
            <Rocket className="h-4 w-4" />
            <AlertTitle>No Challenges Found!</AlertTitle>
            <AlertDescription>
                This page is ready. Challenges will be displayed here once they are added to the mock data store.
            </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {challenges.map((challenge) => (
            <Card key={challenge.id} className="flex flex-col bg-card/50 border-border/50 transition-all hover:shadow-lg hover:border-primary/50">
                <CardHeader>
                    <div className="flex justify-between items-start">
                    <CardTitle className="text-2xl text-foreground pr-4">{challenge.title}</CardTitle>
                        <Badge variant={
                            challenge.difficulty === 'Beginner' ? 'secondary' :
                            challenge.difficulty === 'Intermediate' ? 'default' :
                            'destructive'
                        } className="flex-shrink-0">
                            {challenge.difficulty}
                        </Badge>
                    </div>
                <CardDescription className="pt-2">{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                    <div>
                        <h4 className="font-bold mb-2 flex items-center gap-2"><Target className="h-4 w-4 text-muted-foreground"/> Judging Criteria</h4>
                        <div className="flex flex-wrap gap-2">
                            {challenge.criteria.map((criterion, i) => (
                            <Badge key={i} variant="outline">{criterion}</Badge>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2 flex items-center gap-2"><Award className="h-4 w-4 text-muted-foreground"/> Points</h4>
                        <div className="flex items-center gap-2 text-primary font-bold text-lg">
                            <span>{challenge.points}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
            ))}
        </div>
      )}
    </div>
  );
}
