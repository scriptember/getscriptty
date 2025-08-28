
import { db } from '@/lib/firebase';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData, query, where, limit, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
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
    const querySnapshot = await getDocs(q);
    const teams = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Team, 'id'>)
    }));
    return teams;
}


export async function getMentors(): Promise<Mentor[]> {
    const mentorsCollection = collection(db, 'mentors');
    const querySnapshot = await getDocs(mentorsCollection);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Mentor, 'id'>)
    }));
}

export async function getChallenges(): Promise<Challenge[]> {
   const challengesCollection = collection(db, 'challenges');
    const q = query(challengesCollection, orderBy('points', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Challenge, 'id'>)
    }));
}

export async function getSchedule(): Promise<ScheduleItem[]> {
    const scheduleCollection = collection(db, 'schedule');
    const querySnapshot = await getDocs(scheduleCollection);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<ScheduleItem, 'id'>)
    }));
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
