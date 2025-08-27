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
    return { success: true, issues };
}
