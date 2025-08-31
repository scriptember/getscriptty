
import { db } from '@/lib/firebase';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData, query, where, limit, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import data from '@/lib/mock-data.json';

const { mentors: mockMentors, challenges, schedule, teamData, commitActivity, githubIssues: mockGithubIssues, teams: mockTeams } = data;

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
    return Promise.resolve(mockTeams);
}


export async function getMentors(): Promise<Mentor[]> {
    const mentors = [...mockMentors];
    const mentorToUpdate = mentors.find(m => m.id === 'mentor-5');

    if (mentorToUpdate) {
        try {
            const response = await fetch('https://api.github.com/users/malikobansa');
            if (response.ok) {
                const githubProfile = await response.json();
                mentorToUpdate.name = githubProfile.name || githubProfile.login;
                mentorToUpdate.bio = githubProfile.bio || mentorToUpdate.bio;
                mentorToUpdate.avatar = githubProfile.avatar_url;
            }
        } catch (error) {
            console.error("Failed to fetch mentor profile from GitHub", error);
        }
    }
    
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
