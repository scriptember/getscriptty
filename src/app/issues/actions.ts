"use server";

export interface GithubIssue {
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


export async function getGithubIssues() {
    const repo = 'firebase/genkit'; 
    const url = `https://api.github.com/repos/${repo}/issues?state=open&sort=updated`;

    try {
        const response = await fetch(url, {
            headers: {
                "Accept": "application/vnd.github.v3+json",
                "User-Agent": "Scriptember-Hackathon-App"
            },
            next: {
                revalidate: 300 // Revalidate every 5 minutes
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("GitHub API Error:", errorData.message);
            return { success: false, error: `Failed to fetch issues from GitHub: ${errorData.message || response.statusText}` };
        }

        const issues: GithubIssue[] = await response.json();
        return { success: true, issues };
    } catch (error) {
        console.error("Error fetching repository issues:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return { success: false, error: `An error occurred while fetching data: ${errorMessage}` };
    }
}
