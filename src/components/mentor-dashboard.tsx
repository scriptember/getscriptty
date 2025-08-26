import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Video, ExternalLink } from "lucide-react";

const mentorData = {
    upcomingSessions: [
        { id: 1, team: "Data Dynamos", topic: "Firebase Scaling", time: "Sep 3, 2024, 2:00 PM", meetingUrl: "#" },
        { id: 2, team: "Web Weavers", topic: "React Performance Tips", time: "Sep 4, 2024, 11:00 AM", meetingUrl: "#" },
    ],
    pastSessions: [
        { id: 1, team: "AI Avengers", topic: "Intro to Genkit", date: "Sep 2, 2024" },
    ],
    expertise: ["React", "Next.js", "Firebase", "Performance", "TypeScript", "UI/UX"],
};

export default function MentorDashboard() {
    return (
        <Card className="bg-card/50 border-border/50">
            <CardHeader>
                 <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl">Mentor Zone</CardTitle>
                        <CardDescription>Your upcoming sessions and availability.</CardDescription>
                    </div>
                     <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4"/> Manage Availability
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold mb-4">Your Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                        {mentorData.expertise.map(skill => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Upcoming Sessions</h3>
                    {mentorData.upcomingSessions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {mentorData.upcomingSessions.map(session => (
                                <Card key={session.id}>
                                    <CardHeader>
                                        <CardTitle className="text-xl">{session.team}</CardTitle>
                                        <CardDescription>{session.topic}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center text-sm text-muted-foreground gap-2">
                                           <Clock className="h-4 w-4"/>
                                           <span>{session.time}</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full" asChild>
                                            <a href={session.meetingUrl} target="_blank" rel="noopener noreferrer">
                                                <Video className="mr-2 h-4 w-4"/> Join Meeting
                                            </a>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">You have no upcoming sessions scheduled.</p>
                    )}
                </div>

                 <div>
                    <h3 className="text-lg font-semibold mb-4">Past Sessions</h3>
                     {mentorData.pastSessions.length > 0 ? (
                        <ul className="space-y-2">
                           {mentorData.pastSessions.map(session => (
                               <li key={session.id} className="flex justify-between items-center p-3 bg-background rounded-md">
                                   <div>
                                       <span className="font-medium">{session.team}</span> - <span className="text-muted-foreground">{session.topic}</span>
                                   </div>
                                   <span className="text-sm text-muted-foreground">{session.date}</span>
                               </li>
                           ))}
                        </ul>
                     ) : (
                        <p className="text-muted-foreground">No sessions completed yet.</p>
                     )}
                </div>
            </CardContent>
             <CardFooter className="flex justify-end">
                <Button variant="link">
                    View Mentor Guidelines <ExternalLink className="ml-2 h-4 w-4"/>
                </Button>
            </CardFooter>
        </Card>
    );
}
