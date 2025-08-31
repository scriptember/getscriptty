
import data from '@/lib/mock-data.json';

const { mentors: mockMentors, challenges, schedule, teamData, commitActivity, githubIssues: mockGithubIssues, sponsors: mockSponsors, teams: mockTeams } = data;

interface Challenge {
    id: string;
    title: string;
    description: string;
    criteria: string[];
    points: number;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface Mentor {
    id: string;
    name: string;
    bio: string;
    expertise: string[];
    avatar: string;
    githubUrl?: string;
    websiteUrl?: string;
}

interface SponsorTier {
    name: string;
    logoUrl: string;
    site: string;
}

interface Sponsors {
    [key: string]: SponsorTier[];
}


interface ScheduleItem {
    id: string;
    date: string;
    time: string;
    title: string;
    speaker: string;
    track?: string;
}

export interface Team {
    id: string;
    name: string;
    projectIdea: string;
    createdAt: any;
}

// In a real app, you would pass the user's ID to this function
export function getTeamByUserId(userId: string = "default_user"): any | null {
    // Simulating fetching data for a static build
    return teamData;
}

// IMPORTANT: This function MUST only use mock data to be compatible with `next build` and `output: 'export'`.
// A live Firestore query here will cause the build to fail.
export function getTeams(): Team[] {
    const teamsWithDate = (mockTeams || []).map((team: any) => ({
        ...team,
        createdAt: new Date(team.createdAt || new Date().toISOString()),
    }));
    return teamsWithDate as Team[];
}


export function getMentors(): Mentor[] {
    // Using mock data to ensure stable builds
    return mockMentors;
}

export function getSponsors(): Sponsors {
    // Using mock data to ensure stable builds
    return mockSponsors;
}


export function getChallenges(): Challenge[] {
   return challenges;
}

export function getSchedule(): ScheduleItem[] {
    return schedule;
}

export function getCommitActivity() {
    // Simulating fetching data for a static build
    return commitActivity;
}

export function getGithubIssues() {
    // Using mock data to ensure stable builds
    return mockGithubIssues;
}
