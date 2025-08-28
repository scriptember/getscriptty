
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';

// IMPORTANT: Replace with your service account key file path
// You can generate this file in your Firebase project settings > Service accounts
const serviceAccountPath = './serviceAccountKey.json'; 
// Make sure this file is in your .gitignore to avoid committing it to your repository

let serviceAccount;
try {
  serviceAccount = await import(resolve(serviceAccountPath), { assert: { type: 'json' } });
} catch (error) {
  console.error('Error: Could not find serviceAccountKey.json.');
  console.error('Please download it from your Firebase project settings and place it in the root directory.');
  process.exit(1);
}

initializeApp({
  credential: cert(serviceAccount.default),
});

const db = getFirestore();
const outputFile = resolve(process.cwd(), 'src/lib/mock-data.json');

async function fetchCollection(collectionName) {
  const snapshot = await db.collection(collectionName).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function seed() {
  console.log('Fetching data from Firestore...');
  try {
    const mentors = await fetchCollection('mentors');
    const challenges = await fetchCollection('challenges');
    const schedule = await fetchCollection('schedule');
    // Add other collections here if needed
    
    // Default mock data that doesn't need to be in Firestore
     const teamData = {
        id: "team1",
        name: "The Code Crusaders",
        project: "AI-Powered Code Reviewer",
        progress: 65,
        members: [
            { name: "Alice", avatar: "https://picsum.photos/seed/alice/40/40" },
            { name: "Bob", avatar: "https://picsum.photos/seed/bob/40/40" },
            { name: "Charlie", avatar: "https://picsum.photos/seed/charlie/40/40" },
            { name: "You", avatar: "https://picsum.photos/seed/you/40/40" },
        ],
        repoUrl: "https://github.com/firebase/genkit",
        chatUrl: "#",
        docsUrl: "#",
    };

    const commitActivity = [
        {
            sha: 'abc1234',
            html_url: '#',
            commit: {
                author: { name: 'dev-one', date: new Date().toISOString() },
                message: 'feat: Implement initial project structure'
            },
            author: { avatar_url: 'https://picsum.photos/seed/dev1/40/40', login: 'dev-one' }
        },
        {
            sha: 'def5678',
            html_url: '#',
            commit: {
                author: { name: 'dev-two', date: new Date(Date.now() - 3600000).toISOString() },
                message: 'fix: Corrected typo in documentation'
            },
            author: { avatar_url: 'https://picsum.photos/seed/dev2/40/40', login: 'dev-two' }
        }
    ];

    const githubIssues = [
        {
          id: 1,
          number: 123,
          title: "Fix documentation link in README",
          html_url: "#",
          state: "open",
          comments: 2,
          created_at: new Date().toISOString(),
          user: { login: "github-user", html_url: "#" },
          labels: [{ id: 1, name: "documentation", color: "fbca04" }]
        },
        {
          id: 2,
          number: 124,
          title: "Improve component performance",
          html_url: "#",
          state: "open",
          comments: 5,
          created_at: new Date(Date.now() - 86400000).toISOString(),
          user: { login: "another-user", html_url: "#" },
          labels: [{ id: 2, name: "performance", color: "d93f0b" }, { id: 3, name: "good first issue", color: "0e8a16" }]
        }
    ];


    const data = {
      mentors,
      challenges,
      schedule,
      teamData,
      commitActivity,
      githubIssues,
    };

    await writeFile(outputFile, JSON.stringify(data, null, 2));
    console.log(`Successfully wrote Firestore data to ${outputFile}`);
  } catch (error) {
    console.error('Error fetching data from Firestore:', error);
    process.exit(1);
  }
}

seed();
