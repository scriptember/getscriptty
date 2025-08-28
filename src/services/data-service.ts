
import { db } from '@/lib/firebase';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData, query, where, limit } from 'firebase/firestore';
import { mentors, challenges, schedule, teamData, commitActivity, githubIssues } from '@/lib/mock-data';


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

interface TeamData {
    id: string;
    name: string;
    project: string;
    progress: number;
    members: { name: string; avatar: string; }[];
    repoUrl: string;
    chatUrl: string;
    docsUrl: string;
}

// In a real app, you would pass the user's ID to this function
export async function getTeamByUserId(userId: string = "default_user"): Promise<TeamData | null> {
    // Simulating fetching data for a static build
    return Promise.resolve(teamData);
}


export async function getMentors(): Promise<Mentor[]> {
    // Simulating fetching data for a static build
    return Promise.resolve(mentors);
}

export async function getChallenges(): Promise<Challenge[]> {
    // Simulating fetching data for a static build
    const challengeList = challenges.sort((a, b) => a.points - b.points);
    return Promise.resolve(challengeList);
}

export async function getSchedule(): Promise<ScheduleItem[]> {
    // Simulating fetching data for a static build
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
