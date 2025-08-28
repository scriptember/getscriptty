
import {
    mentors,
    baseChallenges,
    getSchedule as getScheduleData,
    teamData as getTeamData,
    commitActivity
} from '@/lib/mock-data';

export async function getMentors() {
    // In a real app, you would fetch this from a database or API
    return Promise.resolve(mentors);
}

export async function getChallenges() {
    // In a real app, you would fetch this from a database or API
    const challenges = Array.from({ length: 5 }).flatMap(() => baseChallenges).sort((a, b) => a.points - b.points);
    return Promise.resolve(challenges);
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
