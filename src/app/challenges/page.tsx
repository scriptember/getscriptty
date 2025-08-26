import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Target, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const baseChallenges = [
  {
    title: "Personal Portfolio Website",
    description: "Build a stunning, responsive portfolio website to showcase your skills and projects. A great starting point for any developer.",
    criteria: ["Design", "Responsiveness", "Content"],
    points: 250,
    difficulty: "Beginner",
  },
  {
    title: "Interactive Data Visualization",
    description: "Find a public dataset and build a web app to visualize it in an interesting way. Use a library like D3.js or Recharts.",
    criteria: ["Data Handling", "User Experience", "Clarity"],
    points: 400,
    difficulty: "Beginner",
  },
  {
    title: "Real-Time Chat Application",
    description: "Create a chat application using WebSockets or a service like Firebase. Allow users to join rooms and communicate in real-time.",
    criteria: ["Real-Time Sync", "UI/UX", "Scalability"],
    points: 600,
    difficulty: "Intermediate",
  },
  {
    title: "AI-Powered Content Generator",
    description: "Build a tool that uses a generative AI model (like one from Genkit) to create content, such as blog posts, social media updates, or even code snippets.",
    criteria: ["AI Integration", "Utility", "Originality"],
    points: 750,
    difficulty: "Intermediate",
  },
  {
    title: "Contribute to a Major Open-Source Project",
    description: "Find a well-known open-source project and make a meaningful contribution, like fixing a complex bug or implementing a requested feature.",
    criteria: ["Impact", "Code Quality", "Collaboration"],
    points: 900,
    difficulty: "Advanced",
  },
  {
    title: "Web3 Decentralized Voting System",
    description: "Create a secure and transparent voting application on a blockchain. Focus on preventing fraud and ensuring user privacy.",
    criteria: ["Decentralization", "Security", "Social Impact"],
    points: 1000,
    difficulty: "Advanced",
  },
];

const challenges = Array.from({ length: 5 }).flatMap(() => baseChallenges);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {challenges.map((challenge, index) => (
          <Card key={index} className="flex flex-col bg-card/50 border-border/50 transition-all hover:shadow-lg hover:border-primary/50">
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
    </div>
  );
}
