
import {
    mentors,
    baseChallenges,
    getSchedule as getScheduleData,
    teamData as getTeamData,
    commitActivity
} from '@/lib/mock-data';
import { db } from '@/lib/firebase';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';


interface Challenge {
    id: string;
    title: string;
    description: string;
    criteria: string[];
    points: number;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}


export async function getMentors() {
    // In a real app, you would fetch this from a database or API
    return Promise.resolve(mentors);
}

export async function getChallenges(): Promise<Challenge[]> {
    const challengesCol = collection(db, 'challenges');
    const challengeSnapshot = await getDocs(challengesCol);
    const challengeList = challengeSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();
        return {
            id: doc.id,
            title: data.title || '',
            description: data.description || '',
            criteria: data.criteria || [],
            points: data.points || 0,
            difficulty: data.difficulty || 'Beginner',
        } as Challenge;
    });
    return challengeList.sort((a, b) => a.points - b.points);
}

export async function getSchedule() {
    // In a real app, you would fetch this from a database or API
    const currentYear = new Date().getFullYear();
    return Promise.resolve(getScheduleData(currentYear));
}

export async function getTeamInfo() {
    // In a real app, you would fetch this from a database or API
    return Promise.resolve(getTeamData);
}

export async function getCommitActivity() {
    // In a real app, this would fetch from a service like the GitHub API
    return Promise.resolve(commitActivity);
}
