import TeamForm from "@/components/team-form";
import { Users } from "lucide-react";

export default function CreateTeamPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <div className="inline-block bg-primary/10 text-primary p-4 rounded-full mb-4">
            <Users className="h-10 w-10"/>
        </div>
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl text-primary">
          Assemble Your Team
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
          Fill out the details below to create your team. You'll be able to invite members after creation.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <TeamForm />
      </div>

    </div>
  );
}
