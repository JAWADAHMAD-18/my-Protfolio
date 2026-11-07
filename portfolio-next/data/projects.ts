export type ProjectCategory = "web" | "mobile" | "ai";

export interface ProjectCaseStudy {
  overview: string;
  problem?: string; // [FILL]
  built: string[];
  architecture?: string; // [CONFIRM]
  highlights?: string; // [FILL]
  roleAndTimeline?: string; // [FILL]
}

export interface ProjectMedia {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  categories: ProjectCategory[];
  featured: boolean;
  stack: string[];
  live?: string;
  github?: string;
  media?: ProjectMedia;
  caseStudy?: ProjectCaseStudy;
}

export const projects: Project[] = [
  {
    slug: "tripfusion",
    title: "TripFusion",
    tagline: "An AI-assisted travel platform for booking flights, hotels and custom packages, with a React Native companion app on the same backend.",
    description: "AI-powered travel platform for booking flights, hotels and custom packages with smart recommendations.",
    categories: ["web", "mobile"],
    featured: true,
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "JWT",
      "Google OAuth",
      "Socket.io",
      "React Native",
      "Expo",
    ],
    live: "https://tripfusion.vercel.app/",
    github: undefined, // [FILL: GitHub repository URL if public]
    media: {
      type: "image",
      src: "/portfolioTrip.png",
      alt: "TripFusion travel platform interface",
    },
    caseStudy: {
      overview: "Full-stack travel platform with token-based authentication (Access + Refresh tokens), realtime chat using Socket.io, and AI-assisted features. Includes a companion mobile app in React Native and Expo using the same backend.",
      problem: "[FILL: specific challenge TripFusion addresses in travel booking]",
      built: [
        "Full-stack MERN platform with Redis caching and JWT token-based auth (access + refresh tokens).",
        "Real-time customer service chat powered by Socket.io.",
        "Cross-platform companion mobile app built with React Native and Expo sharing the Node/Express backend.",
        "AI-assisted itinerary recommendations and rule-based bot API.",
      ],
      architecture: "Clients (Web & Mobile) -> API (Node/Express) -> MongoDB + Redis; Socket.io channel for chat [CONFIRM details]",
      highlights: "[FILL: technical challenges overcome during development]",
      roleAndTimeline: "Solo Developer, Final Year Project (2025–2026) [CONFIRM: solo]",
    },
  },
  {
    slug: "ahmed-ai-voice-receptionist",
    title: "Ahmed, AI Voice Receptionist",
    tagline: "A voice agent that answers clinic calls in real time, handles questions and books appointments using natural speech.",
    description: "Conversational AI voice agent that handles clinic calls in real time, answering queries and booking appointments using natural speech.",
    categories: ["ai"],
    featured: true,
    stack: ["VAPI", "ElevenLabs", "Groq", "n8n"],
    // Per standing rules: Do NOT carry Google Drive link. Local audio player demo on page.
    live: undefined,
    github: undefined, // [FILL/private]
    media: {
      type: "image",
      src: "/aiagent.jpeg",
      alt: "Ahmed, AI Voice Receptionist",
    },
    caseStudy: {
      overview: "Conversational AI voice agent that handles clinic phone calls in real time, resolves inquiries with natural speech, and coordinates appointment scheduling.",
      problem: "[FILL: clinic receptionist call volume and missed patient appointments]",
      built: [
        "Configured VAPI and ElevenLabs telephony pipeline for natural voice synthesis and low response latency.",
        "Integrated n8n automation workflows connecting callers with Groq LLM inference.",
        "Automated appointment booking logic verifying calendar availability in real time.",
        "Custom audio playback demo with synchronized transcript display.",
      ],
      architecture: "Caller -> VAPI (Telephony & Speech) -> n8n Workflow -> Groq LLM -> Appointment Booking [CONFIRM actual flow]",
      highlights: "[FILL: optimizing voice latency under 800ms for natural dialogue]",
      roleAndTimeline: "AI Automation Engineer (2025–2026) [CONFIRM]",
    },
  },
  {
    slug: "hisab-kitab",
    title: "Hisab Kitab",
    tagline: "A personal finance tracker with monthly income and expense tracking, WhatsApp voice-note logging and LLM-written email reports.",
    description: "AI-powered personal finance tracker with monthly expense and income tracking, WhatsApp voice-note logging and LLM-generated narrative email reports.",
    categories: ["web", "ai"],
    // [CONFIRM whether a React Native mobile companion exists; if yes add 'mobile' category]
    featured: true,
    stack: [
      "Next.js",
      "TypeScript",
      "MongoDB",
      "NextAuth.js",
      "Tailwind CSS",
      "Framer Motion",
      "Groq",
    ],
    live: "https://hissab-kitab-eosin.vercel.app/",
    github: undefined, // [FILL: GitHub repository URL]
    media: {
      type: "image",
      src: "/portfolioHisabKitab.png",
      alt: "Hisab Kitab personal finance tracker",
    },
    caseStudy: {
      overview: "Personal finance platform combining monthly financial tracking with WhatsApp voice-note transaction recording and LLM-written analytical email reports.",
      problem: "[FILL: high friction in traditional expense tracking and lack of actionable insights]",
      built: [
        "Full-stack Next.js App Router application with MongoDB data models and TypeScript safety.",
        "User authentication and session security via NextAuth.js.",
        "WhatsApp voice-note transaction ingestion pipeline.",
        "Scheduled monthly narrative financial analysis reports generated via Groq LLM.",
      ],
      architecture: "Next.js + NextAuth -> MongoDB Atlas; Groq LLM for report generation [CONFIRM]",
      highlights: "[FILL: parsing conversational Urdu/English voice notes into structured transaction records]",
      roleAndTimeline: "Full-stack Developer (2025–2026) [CONFIRM]",
    },
  },
  {
    slug: "whatsapp-auto-reply-assistant",
    title: "WhatsApp Auto-Reply Assistant",
    tagline: "A personal WhatsApp bot that replies in your own texting style, with tiered contact routing, voice-note transcription and a self-approval flow for sensitive topics.",
    description: "A personal WhatsApp bot that replies in your own texting style, with tiered contact routing, voice-note transcription and a self-approval flow for sensitive topics.",
    categories: ["ai"],
    featured: false,
    stack: ["Baileys", "Groq", "Groq Whisper", "MongoDB", "Node.js"],
    live: undefined, // (no live demo)
    github: "https://github.com/JAWADAHMAD-18/whatsapp_bot",
    media: {
      type: "image",
      src: "/portfolioWhatsappBot.png",
      alt: "WhatsApp Auto-Reply Assistant",
    },
  },
  {
    slug: "biztrack",
    title: "BizTrack",
    tagline: "A full-stack business management application with comprehensive dashboard and data analytics.",
    description: "A full-stack business management app built with Appwrite.",
    categories: ["web"],
    featured: false,
    stack: ["React", "Appwrite", "Tailwind CSS", "JavaScript"],
    live: "https://biztrack-j.vercel.app/",
    github: undefined, // [FILL: GitHub repository URL]
    media: {
      type: "image",
      src: "/biztrack.png",
      alt: "BizTrack business management dashboard",
    },
  },
  {
    slug: "student-guidance-portal",
    title: "Student Guidance Portal",
    tagline: "A Django platform that connects students and teachers, with role-based access and guidance features.",
    description: "A Django platform that connects students and teachers, with role-based access and guidance features.",
    categories: ["web"],
    featured: false,
    stack: ["Django", "Python", "HTML5", "CSS3", "JavaScript"],
    live: "https://jawad.pythonanywhere.com/",
    github: undefined, // [FILL: GitHub repository URL]
    media: {
      type: "image",
      src: "/project2.jpg",
      alt: "Student Guidance Portal",
    },
  },
  {
    slug: "blogging-platform",
    title: "Blogging Platform",
    tagline: "A full-stack blogging platform with authentication and content management.",
    description: "A full-stack blogging platform with authentication and content management.",
    categories: ["web"],
    featured: false,
    stack: ["React", "Appwrite", "Tailwind CSS"],
    live: "https://myblog-j.vercel.app/",
    github: undefined, // [FILL: GitHub repository URL]
    media: {
      type: "image",
      src: "/myblog.png",
      alt: "Blogging Platform",
    },
  },
  {
    slug: "rolex-frontend",
    title: "Rolex Frontend",
    tagline: "A modern frontend for a Rolex-themed luxury showcase website.",
    description: "A modern frontend for a Rolex-themed website.",
    categories: ["web"],
    featured: false,
    stack: ["React", "Tailwind CSS"],
    live: "https://rolex-j.vercel.app/",
    github: undefined, // [FILL: GitHub repository URL]
    media: {
      type: "image",
      src: "/rolex.png",
      alt: "Rolex luxury watch website showcase",
    },
  },
  {
    slug: "bata-clone",
    title: "Bata Clone",
    tagline: "A fully responsive clone of the Bata e-commerce landing page.",
    description: "A fully responsive clone of the Bata website.",
    categories: ["web"],
    featured: false,
    stack: ["HTML5", "CSS3", "JavaScript"],
    live: "https://bata-clone-page.vercel.app/",
    github: undefined, // [FILL: GitHub repository URL]
    media: {
      type: "image",
      src: "/project1.jpg",
      alt: "Bata website responsive clone",
    },
  },
];

// Helper functions per specification
export function getFeatured(): Project[] {
  return projects.filter((project) => project.featured);
}
export const getFeaturedProjects = getFeatured;

export function getBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
export const getProjectBySlug = getBySlug;

export function filterByCategory(category: ProjectCategory | "all"): Project[] {
  if (category === "all") {
    return projects;
  }
  return projects.filter((project) => project.categories.includes(category));
}
export const filterProjectsByCategory = filterByCategory;
