
import { db } from '@/lib/firebase';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData, query, where, limit, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import data from '@/lib/mock-data.json';

const { mentors, challenges, schedule, teamData, commitActivity, githubIssues } = data;

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

export async function getTeams(): Promise<Team[]> {
    const teamsCollection = collection(db, 'teams');
    const q = query(teamsCollection, orderBy('createdAt', 'desc'));
    // This is a placeholder for when we fetch live data on the client side.
    // For build time, we would use a static data source.
    // For now, returning an empty array to avoid build errors.
    return Promise.resolve([]);
}


export async function getMentors(): Promise<Mentor[]> {
    return Promise.resolve(mentors);
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
    // Simulating fetching data for a static build
    return Promise.resolve(githubIssues);
}

export async function createTeam(teamName: string, projectIdea: string): Promise<string> {
    const docRef = await addDoc(collection(db, "teams"), {
        name: teamName,
        projectIdea: projectIdea,
        createdAt: serverTimestamp(),
    });
    return docRef.id;
}
