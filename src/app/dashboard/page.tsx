import TeamDashboard from "@/components/team-dashboard";
import MentorDashboard from "@/components/mentor-dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users } from "lucide-react";

export default function DashboardPage() {
  // In a real app, you'd fetch user data to determine which tabs to show.
  // For now, we'll assume the user can be both a participant and a mentor.
  const isParticipant = true;
  const isMentor = true;

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl text-primary">
          Your Dashboard
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          Manage your hackathon journey here.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
         <Tabs defaultValue="team" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="team" disabled={!isParticipant}>
                <Users className="mr-2"/>
                My Team
            </TabsTrigger>
            <TabsTrigger value="mentor" disabled={!isMentor}>
                <User className="mr-2"/>
                Mentor Zone
            </TabsTrigger>
          </TabsList>
          <TabsContent value="team">
            <TeamDashboard />
          </TabsContent>
          <TabsContent value="mentor">
             <MentorDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
