import AiTitleForm from "@/components/ai-title-form";
import { Bot } from "lucide-react";
import { generateProjectTitle } from "@/ai/flows/project-title-generator";

export default function ProjectsPage() {
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

    </div>
  );
}
