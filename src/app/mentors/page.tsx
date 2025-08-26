
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Globe, Briefcase } from "lucide-react";

const mentors = [
  {
    name: "Alex Johnson",
    bio: "Senior Frontend Engineer at Google, specializing in React and performance optimization. Passionate about open-source and mentoring.",
    expertise: ["React", "Next.js", "Performance", "TypeScript"],
    avatar: "https://picsum.photos/seed/mentor1/200/200",
  },
  {
    name: "Samantha Lee",
    bio: "Firebase expert and Google Developer Expert. Loves helping teams build scalable and robust backends for their applications.",
    expertise: ["Firebase", "Node.js", "Cloud Functions", "NoSQL"],
    avatar: "https://picsum.photos/seed/mentor2/200/200",
  },
  {
    name: "Ben Carter",
    bio: "UX/UI Designer with a knack for creating beautiful and intuitive interfaces. Believes good design is key to a successful hackathon project.",
    expertise: ["UI/UX Design", "Figma", "Tailwind CSS", "Accessibility"],
    avatar: "https://picsum.photos/seed/mentor3/200/200",
  },
  {
    name: "David Chen",
    bio: "AI Specialist and Staff Engineer at Google. Focused on making generative AI accessible to all developers. Core contributor to Genkit.",
    expertise: ["GenAI", "Genkit", "LLMs", "AI Ethics"],
    avatar: "https://picsum.photos/seed/mentor4/200/200",
  },
];

export default function MentorsPage() {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {mentors.map((mentor, index) => (
          <Card key={index} className="flex flex-col text-center bg-card/50 border-border/50 transition-all hover:shadow-lg hover:border-primary/50 transform hover:-translate-y-1">
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
                 <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                 <Globe className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
