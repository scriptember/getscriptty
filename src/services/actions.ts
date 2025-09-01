
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
