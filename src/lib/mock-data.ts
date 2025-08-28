
export const mentors = [
  {
    name: "Alex Johnson",
    bio: "Senior Frontend Engineer at Google, specializing in React and performance optimization. Passionate about open-source and mentoring.",
    expertise: ["React", "Next.js", "Performance", "TypeScript"],
    avatar: "https://picsum.photos/seed/mentor1/200/200",
  },
  {
    name: "Samantha Lee",
    bio: "Firebase expert and Google Developer Expert. Loves helping teams build scalable and robust backends for their applications.",
    expertise: ["Firebase", "Node.js", "Cloud Functions", "NoSQL"],
    avatar: "https://picsum.photos/seed/mentor2/200/200",
  },
  {
    name: "Ben Carter",
    bio: "UX/UI Designer with a knack for creating beautiful and intuitive interfaces. Believes good design is key to a successful hackathon project.",
    expertise: ["UI/UX Design", "Figma", "Tailwind CSS", "Accessibility"],
    avatar: "https://picsum.photos/seed/mentor3/200/200",
  },
  {
    name: "David Chen",
    bio: "AI Specialist and Staff Engineer at Google. Focused on making generative AI accessible to all developers. Core contributor to Genkit.",
    expertise: ["GenAI", "Genkit", "LLMs", "AI Ethics"],
    avatar: "https://picsum.photos/seed/mentor4/200/200",
  },
];

export const baseChallenges = [
  {
    title: "Personal Portfolio with Next.js",
    description: "Build a stunning, responsive portfolio website with Next.js and Tailwind CSS to showcase your skills and projects. A great starting point for any developer.",
    criteria: ["Next.js", "React", "Design"],
    points: 250,
    difficulty: "Beginner",
  },
  {
    title: "Interactive Data Visualization with D3.js",
    description: "Find a public dataset on GitHub and build a web app to visualize it in an interesting way using D3.js and React. ",
    criteria: ["D3.js", "Data Handling", "React"],
    points: 400,
    difficulty: "Beginner",
  },
  {
    title: "Real-Time Chat App with Socket.IO",
    description: "Create a chat application using Node.js, Express, and Socket.IO. Allow users to join rooms and communicate in real-time.",
    criteria: ["WebSockets", "Node.js", "UI/UX"],
    points: 600,
    difficulty: "Intermediate",
  },
  {
    title: "AI-Powered README Generator with Genkit",
    description: "Build a tool that uses a generative AI model (like one from Genkit) to automatically create a high-quality README.md file for a GitHub repository.",
    criteria: ["AI Integration", "GitHub API", "Utility"],
    points: 750,
    difficulty: "Intermediate",
  },
  {
    title: "Contribute to a Major JS Open-Source Project",
    description: "Find a well-known JavaScript open-source project (e.g., on GitHub) and make a meaningful contribution, like fixing a complex bug or implementing a requested feature.",
    criteria: ["Impact", "Code Quality", "Collaboration"],
    points: 900,
    difficulty: "Advanced",
  },
  {
    title: "Browser Extension with React",
    description: "Create a useful browser extension for Chrome or Firefox using React. Focus on a specific task that can be automated or simplified.",
    criteria: ["React", "Browser APIs", "Utility"],
    points: 1000,
    difficulty: "Advanced",
  },
];

export const getSchedule = (currentYear: number) => [
    {
      date: `Aug 29, ${currentYear}`,
      time: "4:00 PM",
      title: "Pre-Hackathon Mixer & Team Formation",
      speaker: "Community Managers",
      track: "Community",
    },
    {
      date: `Aug 30, ${currentYear}`,
      time: "1:00 PM",
      title: "Intro to GenAI with Google's Genkit",
      speaker: "AI Specialist",
      track: "Pre-Hackathon",
    },
    {
      date: `Sep 1, ${currentYear}`,
      time: "10:00 AM",
      title: "Opening Ceremony & Keynote",
      speaker: "Jane Doe, CEO of JS-Forge",
      track: "Main",
    },
    {
      date: `Sep 7, ${currentYear}`,
      time: "12:00 PM",
      title: "Workshop: Modern React with Hooks",
      speaker: "John Smith",
      track: "Workshop",
    },
    {
      date: `Sep 14, ${currentYear}`,
      time: "2:00 PM",
      title: "Deep Dive into Next.js App Router",
      speaker: "Emily White",
      track: "Deep Dive",
    },
    {
      date: `Sep 21, ${currentYear}`,
      time: "11:00 AM",
      title: "Firebase for JavaScript Developers",
      speaker: "Michael Brown",
      track: "Workshop",
    },
    {
      date: `Sep 28, ${currentYear}`,
      time: "4:00 PM",
      title: "Project Submission AMA & Office Hours",
      speaker: "Hackathon Organizers",
      track: "Community",
    },
    {
      date: `Sep 30, ${currentYear}`,
      time: "6:00 PM",
      title: "Closing Ceremony & Prize Distribution",
      speaker: "Scriptember Team",
      track: "Main",
    },
  ];

export const teamData = {
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
