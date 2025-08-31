
import { db } from '@/lib/firebase';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData, query, where, limit, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
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
export async function getTeamByUserId(userId: string = "default_user"): Promise<any | null> {
    // Simulating fetching data for a static build
    return Promise.resolve(teamData);
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


export async function getMentors(): Promise<Mentor[]> {
    // Using mock data to ensure stable builds
    return Promise.resolve(mockMentors);
}

export async function getSponsors(): Promise<Sponsors> {
    // Using mock data to ensure stable builds
    return Promise.resolve(mockSponsors);
}


export async function getChallenges(): Promise<Challenge[]> {
   return Promise.resolve(challenges);
}

export async function getSchedule(): Promise<ScheduleItem[]> {
    return Promise.resolve(schedule);
}

export async function getCommitActivity() {
    // Simulating fetching data for a static build
    return Promise.resolve(commitActivity);
}

export async function getGithubIssues() {
    // Using mock data to ensure stable builds
    return Promise.resolve(mockGithubIssues);
}

// Write operations are fine as they are called from client components, not during build.
export async function createTeam(teamName: string, projectIdea: string): Promise<string> {
    const docRef = await addDoc(collection(db, "teams"), {
        name: teamName,
        projectIdea: projectIdea,
        createdAt: serverTimestamp(),
    });
    return docRef.id;
}

export async function createSponsorApplication(applicationData: { companyName: string, contactName: string, contactEmail: string, sponsorshipLevel: string, reason?: string }): Promise<string> {
    const docRef = await addDoc(collection(db, "sponsorshipApplications"), {
        ...applicationData,
        createdAt: serverTimestamp(),
    });
    return docRef.id;
}
