"use server";

export async function getRepoActivity(repo: string) {
    if (!repo || !repo.includes('/')) {
        return { success: false, error: "Invalid repository format. Expected 'owner/repo'." };
    }

    const url = `https://api.github.com/repos/${repo}/commits`;
    
    try {
        const response = await fetch(url, {
            headers: {
                "Accept": "application/vnd.github.v3+json",
                "User-Agent": "Scriptember-Hackathon-App"
            },
            next: {
                revalidate: 60 // Revalidate every 60 seconds
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("GitHub API Error:", errorData.message);
            return { success: false, error: `Failed to fetch data from GitHub: ${errorData.message || response.statusText}` };
        }

        const activity = await response.json();
        return { success: true, activity };
    } catch (error) {
        console.error("Error fetching repository activity:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return { success: false, error: `An error occurred while fetching data: ${errorMessage}` };
    }
}
