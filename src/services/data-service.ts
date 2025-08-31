
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
    const mentors: Mentor[] = [...mockMentors];
    const mentorToUpdate = mentors.find(m => m.name.toLowerCase() === 'abdulmalik');

    if (mentorToUpdate) {
        try {
            // Using abdulmalik's github username as requested
            const response = await fetch('https://api.github.com/users/malikobansa');
            if (response.ok) {
                const githubProfile = await response.json();
                mentorToUpdate.name = githubProfile.name || githubProfile.login;
                mentorToUpdate.bio = mentorToUpdate.bio; // Keep the custom bio from mock-data
                mentorToUpdate.avatar = githubProfile.avatar_url;
                mentorToUpdate.githubUrl = githubProfile.html_url;
                mentorToUpdate.websiteUrl = githubProfile.blog;
            }
        } catch (error) {
            console.error("Failed to fetch mentor profile from GitHub", error);
        }
    }
    
    return Promise.resolve(mentors);
}

export async function getSponsors(): Promise<Sponsors> {
    const sponsors: Sponsors = JSON.parse(JSON.stringify(mockSponsors));
    const sponsorToUpdate = sponsors.gold.find(s => s.name.toLowerCase() === 'scriptember');

    if (sponsorToUpdate) {
        try {
            const response = await fetch('https://api.github.com/orgs/scriptember');
            if (response.ok) {
                const githubOrg = await response.json();
                sponsorToUpdate.name = githubOrg.name || githubOrg.login;
                sponsorToUpdate.logoUrl = githubOrg.avatar_url;
                sponsorToUpdate.site = githubOrg.blog || githubOrg.html_url;
            }
        } catch (error) {
            console.error("Failed to fetch sponsor org from GitHub", error);
        }
    }
    
    return Promise.resolve(sponsors);
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
    try {
        const response = await fetch('https://api.github.com/repos/firebase/genkit/issues');
        if (!response.ok) {
            console.error('Failed to fetch GitHub issues:', response.statusText);
            // Fallback to mock data in case of an API error
            return Promise.resolve(mockGithubIssues);
        }
        const issues = await response.json();
        return issues;
    } catch (error) {
        console.error('Error fetching GitHub issues:', error);
        // Fallback to mock data in case of a network error
        return Promise.resolve(mockGithubIssues);
    }
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
