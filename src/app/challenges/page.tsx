import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Target } from "lucide-react";

const challenges = [
  {
    title: "AI-Powered Developer Tools",
    description: "Build a tool that leverages AI to help developers write better code, faster. Think code completion, automated testing, or intelligent documentation.",
    criteria: ["Innovation", "Utility", "Technical Execution"],
    points: 1000,
  },
  {
    title: "Best Open-Source Contribution",
    description: "Find an existing open-source JavaScript project and make a meaningful contribution. This could be a new feature, a bug fix, or improved documentation.",
    criteria: ["Impact", "Code Quality", "Collaboration"],
    points: 800,
  },
  {
    title: "Web3 for Social Good",
    description: "Create a decentralized application (dApp) that addresses a real-world social or environmental problem. Focus on transparency and user empowerment.",
    criteria: ["Social Impact", "Originality", "Decentralization"],
    points: 1200,
  },
  {
    title: "Gamify Education",
    description: "Develop an interactive web game or application that makes learning a new skill or subject more engaging and fun for everyone.",
    criteria: ["Educational Value", "User Experience", "Creativity"],
    points: 900,
  },
];

export default function ChallengesPage() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {challenges.map((challenge, index) => (
          <Card key={index} className="flex flex-col bg-card/50 border-border/50 transition-all hover:shadow-lg hover:border-primary/50">
            <CardHeader>
              <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl text-foreground">{challenge.title}</CardTitle>
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <Award className="h-5 w-5"/>
                    <span>{challenge.points} pts</span>
                  </div>
              </div>
              <CardDescription className="pt-2">{challenge.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <h4 className="font-bold mb-2 flex items-center gap-2"><Target className="h-4 w-4 text-muted-foreground"/> Judging Criteria</h4>
              <div className="flex flex-wrap gap-2">
                {challenge.criteria.map((criterion, i) => (
                  <Badge key={i} variant="outline">{criterion}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
