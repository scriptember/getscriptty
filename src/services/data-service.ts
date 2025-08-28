
import { db } from '@/lib/firebase';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData, query, where, limit } from 'firebase/firestore';


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
    const teamsCol = collection(db, 'teams');
    // For this example, we'll just grab the first team we find.
    // In a real app, you would query for the team associated with the userId.
    const q = query(teamsCol, limit(1));
    const teamSnapshot = await getDocs(q);

    if (teamSnapshot.empty) {
        return null;
    }

    const teamDoc = teamSnapshot.docs[0];
    const data = teamDoc.data();
    return {
        id: teamDoc.id,
        name: data.name || 'N/A',
        project: data.project || 'N/A',
        progress: data.progress || 0,
        members: data.members || [],
        repoUrl: data.repoUrl || '#',
        chatUrl: data.chatUrl || '#',
        docsUrl: data.docsUrl || '#',
    } as TeamData;
}


export async function getMentors(): Promise<Mentor[]> {
    const mentorsCol = collection(db, 'mentors');
    const mentorSnapshot = await getDocs(mentorsCol);
    const mentorList = mentorSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();
        return {
            id: doc.id,
            name: data.name || '',
            bio: data.bio || '',
            expertise: data.expertise || [],
            avatar: data.avatar || 'https://picsum.photos/200/200',
        } as Mentor;
    });
    return mentorList;
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

export async function getSchedule(): Promise<ScheduleItem[]> {
    const scheduleCol = collection(db, 'schedule');
    const scheduleSnapshot = await getDocs(scheduleCol);
    const scheduleList = scheduleSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();
        return {
            id: doc.id,
            date: data.date || '',
            time: data.time || '',
            title: data.title || '',
            speaker: data.speaker || '',
            track: data.track || '',
        } as ScheduleItem;
    });
    // You might want to sort this by date in a real app
    return scheduleList;
}

export async function getCommitActivity() {
    // In a real app, this would fetch from a service like the GitHub API
    // For now, we return an empty array as it's not Firestore-based.
    return Promise.resolve([]);
}
