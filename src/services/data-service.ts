
import { db } from '@/lib/firebase';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData, query, where, limit, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import data from '@/lib/mock-data.json';

const { mentors: mockMentors, challenges, schedule, teamData, commitActivity, githubIssues: mockGithubIssues, sponsors: mockSponsors } = data;

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

export async function getTeams(): Promise<Team[]> {
    const firestoreQuery = query(collection(db, "teams"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(firestoreQuery);

    const teams = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            name: data.name,
            projectIdea: data.projectIdea,
            createdAt: data.createdAt?.toDate() ?? new Date(), // Convert timestamp to Date
        };
    });
    
    return teams;
}


export async function getMentors(): Promise<Mentor[]> {
    // Reverting to only use mock data to ensure stable builds
    return Promise.resolve(mockMentors);
}

export async function getSponsors(): Promise<Sponsors> {
    // Reverting to only use mock data to ensure stable builds
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
    // Reverting to only use mock data to ensure stable builds.
    // Live API calls can fail during the build process.
    return Promise.resolve(mockGithubIssues);
}

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
