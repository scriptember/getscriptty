"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitPullRequestDraft, MessageSquare, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { Button } from "@/components/ui/button";
import * as React from 'react';

// This is a placeholder for the static export.
// In a server environment, this would fetch from the GitHub API.
const issues: GithubIssue[] = [
    {
      id: 1,
      number: 123,
      title: "Fix documentation link in README",
      html_url: "#",
      state: "open",
      comments: 2,
      created_at: new Date().toISOString(),
      user: { login: "github-user", html_url: "#" },
      labels: [{ id: 1, name: "documentation", color: "fbca04" }]
    },
    {
      id: 2,
      number: 124,
      title: "Improve component performance",
      html_url: "#",
      state: "open",
      comments: 5,
      created_at: new Date().toISOString(),
      user: { login: "another-user", html_url: "#" },
      labels: [{ id: 2, name: "performance", color: "d93f0b" }, { id: 3, name: "good first issue", color: "0e8a16" }]
    }
];

interface GithubIssue {
    id: number;
    number: number;
    title: string;
    html_url: string;
    state: 'open' | 'closed';
    comments: number;
    created_at: string;
    user: {
        login: string;
        html_url: string;
    };
    labels: {
        id: number;
        name: string;
        color: string;
    }[];
    pull_request?: object;
}


function IssuesList() {
    const openIssues = issues.filter(issue => !issue.pull_request);

    return (
        <div className="space-y-6">
            {openIssues.map((issue: GithubIssue) => (
                <Card key={issue.id} className="bg-card/50 border-border/50 transition-all hover:shadow-lg hover:border-primary/50">
                    <CardHeader>
                        <div className="flex justify-between items-start gap-4">
                            <CardTitle className="text-xl text-foreground pr-4">
                                <a href={issue.html_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">
                                    {issue.title}
                                </a>
                            </CardTitle>
                            <div className="flex-shrink-0 flex items-center gap-2">
                                <Badge variant={issue.state === 'open' ? 'secondary' : 'destructive'} className="capitalize">
                                    {issue.state}
                                </Badge>
                                <span className="text-sm text-muted-foreground">#{issue.number}</span>
                            </div>
                        </div>
                        <CardDescription>
                            Opened {formatDistanceToNow(new Date(issue.created_at), { addSuffix: true })} by{' '}
                            <a href={issue.user.html_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{issue.user.login}</a>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {issue.labels.map(label => (
                                <Badge key={label.id} variant="outline" style={{
                                    borderColor: `#${label.color}`,
                                    color: `#${label.color}`
                                }}>
                                    {label.name}
                                </Badge>
                            ))}
                        </div>
                        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                <span>{issue.comments} comments</span>
                            </div>
                             <Button variant="link" asChild className="p-0 h-auto">
                                <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
                                   View on GitHub <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                             </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default function IssuesPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="text-center mb-12">
                <div className="inline-block bg-primary/10 text-primary p-4 rounded-full mb-4">
                    <GitPullRequestDraft className="h-10 w-10" />
                </div>
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl text-primary">
                    Open Issues
                </h1>
                <p className="mt-4 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
                    Looking for a challenge? Pick an issue from a real-world open-source project and start contributing.
                </p>
                 <p className="mt-2 text-sm text-muted-foreground">
                    Currently showing issues from <a href="https://github.com/firebase/genkit" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">firebase/genkit</a>.
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                <React.Suspense fallback={<p>Loading issues...</p>}>
                    <IssuesList />
                </React.Suspense>
            </div>
        </div>
    );
}
