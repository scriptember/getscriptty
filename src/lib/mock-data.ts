
export const mentors = [
  {
    id: "mentor1",
    name: "Alex Johnson",
    bio: "Senior Frontend Engineer at Google, specializing in React and performance optimization. Passionate about open-source and mentoring.",
    expertise: ["React", "Next.js", "Performance", "TypeScript"],
    avatar: "https://picsum.photos/seed/mentor1/200/200",
  },
  {
    id: "mentor2",
    name: "Samantha Lee",
    bio: "Firebase expert and Google Developer Expert. Loves helping teams build scalable and robust backends for their applications.",
    expertise: ["Firebase", "Node.js", "Cloud Functions", "NoSQL"],
    avatar: "https://picsum.photos/seed/mentor2/200/200",
  },
  {
    id: "mentor3",
    name: "Ben Carter",
    bio: "UX/UI Designer with a knack for creating beautiful and intuitive interfaces. Believes good design is key to a successful hackathon project.",
    expertise: ["UI/UX Design", "Figma", "Tailwind CSS", "Accessibility"],
    avatar: "https://picsum.photos/seed/mentor3/200/200",
  },
  {
    id: "mentor4",
    name: "David Chen",
    bio: "AI Specialist and Staff Engineer at Google. Focused on making generative AI accessible to all developers. Core contributor to Genkit.",
    expertise: ["GenAI", "Genkit", "LLMs", "AI Ethics"],
    avatar: "https://picsum.photos/seed/mentor4/200/200",
  },
];

export const challenges = [
  {
    id: "challenge1",
    title: "Personal Portfolio with Next.js",
    description: "Build a stunning, responsive portfolio website with Next.js and Tailwind CSS to showcase your skills and projects. A great starting point for any developer.",
    criteria: ["Next.js", "React", "Design"],
    points: 250,
    difficulty: "Beginner",
  },
  {
    id: "challenge2",
    title: "Interactive Data Visualization with D3.js",
    description: "Find a public dataset on GitHub and build a web app to visualize it in an interesting way using D3.js and React. ",
    criteria: ["D3.js", "Data Handling", "React"],
    points: 400,
    difficulty: "Beginner",
  },
  {
    id: "challenge3",
    title: "Real-Time Chat App with Socket.IO",
    description: "Create a chat application using Node.js, Express, and Socket.IO. Allow users to join rooms and communicate in real-time.",
    criteria: ["WebSockets", "Node.js", "UI/UX"],
    points: 600,
    difficulty: "Intermediate",
  },
  {
    id: "challenge4",
    title: "AI-Powered README Generator with Genkit",
    description: "Build a tool that uses a generative AI model (like one from Genkit) to automatically create a high-quality README.md file for a GitHub repository.",
    criteria: ["AI Integration", "GitHub API", "Utility"],
    points: 750,
    difficulty: "Intermediate",
  },
  {
    id: "challenge5",
    title: "Contribute to a Major JS Open-Source Project",
    description: "Find a well-known JavaScript open-source project (e.g., on GitHub) and make a meaningful contribution, like fixing a complex bug or implementing a requested feature.",
    criteria: ["Impact", "Code Quality", "Collaboration"],
    points: 900,
    difficulty: "Advanced",
  },
  {
    id: "challenge6",
    title: "Browser Extension with React",
    description: "Create a useful browser extension for Chrome or Firefox using React. Focus on a specific task that can be automated or simplified.",
    criteria: ["React", "Browser APIs", "Utility"],
    points: 1000,
    difficulty: "Advanced",
  },
];

export const schedule = [
    {
      id: "event1",
      date: `Aug 29, 2024`,
      time: "4:00 PM",
      title: "Pre-Hackathon Mixer & Team Formation",
      speaker: "Community Managers",
      track: "Community",
    },
    {
      id: "event2",
      date: `Aug 30, 2024`,
      time: "1:00 PM",
      title: "Intro to GenAI with Google's Genkit",
      speaker: "AI Specialist",
      track: "Pre-Hackathon",
    },
    {
      id: "event3",
      date: `Sep 1, 2024`,
      time: "10:00 AM",
      title: "Opening Ceremony & Keynote",
      speaker: "Jane Doe, CEO of JS-Forge",
      track: "Main",
    },
    {
      id: "event4",
      date: `Sep 7, 2024`,
      time: "12:00 PM",
      title: "Workshop: Modern React with Hooks",
      speaker: "John Smith",
      track: "Workshop",
    },
    {
      id: "event5",
      date: `Sep 14, 2024`,
      time: "2:00 PM",
      title: "Deep Dive into Next.js App Router",
      speaker: "Emily White",
      track: "Deep Dive",
    },
    {
      id: "event6",
      date: `Sep 21, 2024`,
      time: "11:00 AM",
      title: "Firebase for JavaScript Developers",
      speaker: "Michael Brown",
      track: "Workshop",
    },
    {
      id: "event7",
      date: `Sep 28, 2024`,
      time: "4:00 PM",
      title: "Project Submission AMA & Office Hours",
      speaker: "Hackathon Organizers",
      track: "Community",
    },
    {
      id: "event8",
      date: `Sep 30, 2024`,
      time: "6:00 PM",
      title: "Closing Ceremony & Prize Distribution",
      speaker: "Scriptember Team",
      track: "Main",
    },
  ];

export const teamData = {
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

export const commitActivity = [
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

export const githubIssues = [
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
