import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, Github, Users, MessageSquare, Settings, Rocket } from "lucide-react";

const teamData = {
    name: "The Code Crusaders",
    project: "AI-Powered Code Reviewer",
    progress: 65,
    members: [
        { name: "Alice", avatar: "https://picsum.photos/seed/alice/40/40" },
        { name: "Bob", avatar: "https://picsum.photos/seed/bob/40/40" },
        { name: "Charlie", avatar: "https://picsum.photos/seed/charlie/40/40" },
        { name: "You", avatar: "https://picsum.photos/seed/you/40/40" },
    ],
    repoUrl: "#",
    chatUrl: "#",
    docsUrl: "#",
};

const recentActivity = [
    { id: 1, text: "Charlie pushed a new commit to the 'feat/auth' branch.", time: "2 hours ago" },
    { id: 2, text: "Alice updated the project documentation.", time: "5 hours ago" },
    { id: 3, text: "A new issue was created: 'Fix login button alignment'.", time: "1 day ago" },
];

export default function TeamDashboard() {
    return (
        <Card className="bg-card/50 border-border/50">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl">{teamData.project}</CardTitle>
                        <CardDescription>Team: {teamData.name}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-4 w-4"/> Manage Team
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <Progress value={teamData.progress} className="w-full"/>
                                <span className="font-bold text-lg text-primary">{teamData.progress}%</span>
                            </div>
                            <div className="flex justify-center mt-6">
                               <Button><Rocket className="mr-2 h-4 w-4"/> Submit Project</Button>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <ul className="space-y-4">
                                {recentActivity.map(activity => (
                                    <li key={activity.id} className="text-sm text-muted-foreground flex items-start gap-3">
                                        <div className="w-1 h-1 bg-primary rounded-full mt-2"></div>
                                        <span>{activity.text} <span className="text-xs">({activity.time})</span></span>
                                    </li>
                                ))}
                           </ul>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5"/> Team Members</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-4">
                                {teamData.members.map(member => (
                                     <div key={member.name} className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={member.avatar} alt={member.name} data-ai-hint="avatar" />
                                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium">{member.name}</span>
                                     </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Resources</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3">
                           <Button variant="outline" asChild><a href={teamData.repoUrl} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4"/> View on GitHub</a></Button>
                           <Button variant="outline" asChild><a href={teamData.chatUrl} target="_blank" rel="noopener noreferrer"><MessageSquare className="mr-2 h-4 w-4"/> Team Chat</a></Button>
                           <Button variant="outline" asChild><a href={teamData.docsUrl} target="_blank" rel="noopener noreferrer"><FileText className="mr-2 h-4 w-4"/> Project Docs</a></Button>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
}
