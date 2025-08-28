
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, Github, Users, MessageSquare, Settings, Rocket, ExternalLink } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { formatDistanceToNow } from 'date-fns';
import { getTeamInfo, getCommitActivity } from "@/services/data-service";

interface TeamData {
    name: string;
    project: string;
    progress: number;
    members: { name: string; avatar: string; }[];
    repoUrl: string;
    chatUrl: string;
    docsUrl: string;
}

interface Commit {
    sha: string;
    html_url: string;
    commit: {
        author: {
            name: string;
            date: string;
        };
        message: string;
    };
    author: {
        avatar_url: string;
        login: string;
    };
}

export default function TeamDashboard() {
    const [teamData, setTeamData] = useState<TeamData | null>(null);
    const [activity, setActivity] = useState<Commit[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                setIsLoading(true);
                const [teamInfo, commitActivity] = await Promise.all([
                    getTeamInfo(),
                    getCommitActivity()
                ]);
                setTeamData(teamInfo);
                setActivity(commitActivity);
            } catch (err) {
                setError("An unexpected error occurred fetching dashboard data.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchDashboardData();
    }, []);

    if (isLoading) {
        return (
            <Card className="bg-card/50 border-border/50">
                <CardHeader>
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-6">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-64 w-full" />
                </CardContent>
            </Card>
        );
    }

    if (error || !teamData) {
        return (
            <Card className="bg-card/50 border-border/50">
                <CardHeader>
                    <CardTitle>Error</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-destructive">{error || "Could not load team data."}</p>
                </CardContent>
            </Card>
        )
    }

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
                            <CardTitle>Recent Commits</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <ul className="space-y-4">
                                {activity.slice(0, 5).map(commit => (
                                    <li key={commit.sha} className="flex items-start gap-3">
                                        <Avatar className="h-8 w-8 mt-1 border-2 border-primary/50">
                                            <AvatarImage src={commit.author?.avatar_url} alt={commit.commit.author.name} data-ai-hint="avatar"/>
                                            <AvatarFallback>{commit.commit.author.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className="text-sm text-foreground break-words">{commit.commit.message.split('\n')[0]}</p>
                                            <div className="text-xs text-muted-foreground mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                                                <span className="font-medium">{commit.author?.login || commit.commit.author.name}</span>
                                                <span>committed {formatDistanceToNow(new Date(commit.commit.author.date), { addSuffix: true })}</span>
                                                 <a href={commit.html_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:underline">
                                                    ({commit.sha.substring(0, 7)}) <ExternalLink className="h-3 w-3 ml-1"/>
                                                 </a>
                                            </div>
                                        </div>
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
                        </Content>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
}
