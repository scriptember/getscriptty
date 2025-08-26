import MentorApplicationForm from "@/components/mentor-application-form";
import { UserCheck } from "lucide-react";

export default function ApplyMentorPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <div className="inline-block bg-primary/10 text-primary p-4 rounded-full mb-4">
            <UserCheck className="h-10 w-10"/>
        </div>
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl text-primary">
          Apply to be a Mentor
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
          Share your expertise and help shape the next generation of developers. Fill out the form below to apply.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <MentorApplicationForm />
      </div>

    </div>
  );
}
