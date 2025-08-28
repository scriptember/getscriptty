
"use client";

import TeamDashboard from "@/components/team-dashboard";
import MentorDashboard from "@/components/mentor-dashboard";
import AdminDashboard from "@/components/admin-dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users, Shield } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  // Roles can be expanded here in the future
  const isParticipant = true;
  const isMentor = true;

  if (loading) {
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
                <Skeleton className="h-10 w-full mb-4"/>
                <Skeleton className="h-96 w-full"/>
            </div>
        </div>
      )
  }

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
          <TabsList className={`grid w-full ${user?.isAdmin ? 'grid-cols-3' : 'grid-cols-2'}`}>
            <TabsTrigger value="team" disabled={!isParticipant}>
                <Users className="mr-2"/>
                My Team
            </TabsTrigger>
            <TabsTrigger value="mentor" disabled={!isMentor}>
                <User className="mr-2"/>
                Mentor Zone
            </TabsTrigger>
            {user?.isAdmin && (
                <TabsTrigger value="admin">
                    <Shield className="mr-2"/>
                    Admin Zone
                </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="team">
            <TeamDashboard />
          </TabsContent>
          <TabsContent value="mentor">
             <MentorDashboard />
          </TabsContent>
          {user?.isAdmin && (
            <TabsContent value="admin">
                <AdminDashboard />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
