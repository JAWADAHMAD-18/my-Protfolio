export type ProjectCategory = "web" | "mobile" | "ai";

export interface ProjectCaseStudy {
  overview: string;
  problem?: string;
  built: string[];
  architecture?: string;
  highlights?: string;
  roleAndTimeline?: string;
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
    description: "AI-assisted travel platform for booking flights, hotels and custom packages, with web and React Native clients on one backend.",
    categories: ["web", "mobile"],
    featured: true,
    stack: [
      "React 19",
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "Socket.IO",
      "Amadeus API",
      "Gemini AI",
      "React Native",
    ],
    live: "https://tripfusion.vercel.app/",
    github: "https://github.com/JAWADAHMAD-18/FYP-project",
    media: {
      type: "image",
      src: "/media/tripfusion/poster.webp",
      alt: "TripFusion travel platform interface",
    },
    caseStudy: {
      overview: "A travel platform with AI-assisted planning and real-time features. Its web and React Native clients share one backend.",
      problem: "Large travel datasets from a third-party API could slow the experience. Redis caching lets large responses load in seconds.",
      built: [
        "React 19 web client and a React Native mobile app using the same backend.",
        "Express API with MongoDB for data and Redis for caching.",
        "Amadeus API integration for travel data and Gemini AI-assisted travel planning.",
        "Real-time features powered by Socket.IO.",
      ],
      architecture: "React 19 web and React Native clients -> Express API -> MongoDB for data, Redis for caching, Amadeus for travel data, Gemini for AI, and Socket.IO for real-time features.",
      highlights: "Redis caching keeps large third-party travel API responses loading in seconds. Gemini assists with travel planning, and the web and mobile clients share one backend.",
      roleAndTimeline: "Solo, end to end. About 2 months for the initial build, working weekends alongside university classes as a final year project; improved afterwards.",
    },
  },
  {
    slug: "ahmed-ai-voice-receptionist",
    title: "Ahmed, AI Voice Receptionist",
    tagline: "An AI voice agent that takes incoming calls through booking and sends a confirmation email automatically.",
    description: "An AI voice agent workflow that takes an incoming call through booking, saves the record, and sends a confirmation email automatically.",
    categories: ["ai"],
    featured: true,
    stack: ["n8n"],
    // Per standing rules: Do NOT carry Google Drive link. Local audio player demo on page.
    live: undefined,
    github: undefined,
    media: {
      type: "image",
      src: "/media/ahmed-ai-voice-receptionist/poster.webp",
      alt: "Ahmed, AI Voice Receptionist",
    },
    caseStudy: {
      overview: "An AI voice agent workflow that takes a call through booking, saves the record, and sends a confirmation email automatically.",
      built: [
        "An n8n workflow takes an incoming call through conversation and booking.",
        "The workflow saves the booking record and sends a confirmation email automatically.",
        "Automated tests are all passing.",
      ],
      architecture: "Incoming call -> conversation -> booking -> save the record -> send a confirmation email automatically.",
      highlights: "Takes a call end to end and turns it into a confirmed booking, a saved record, and an automatic confirmation email. Automated tests are all passing.",
      roleAndTimeline: "Solo-built in about 2 days.",
    },
  },
  {
    slug: "hisab-kitab",
    title: "Hisab Kitab",
    tagline: "A personal finance tracker with monthly income and expense tracking, WhatsApp voice-note logging and LLM-written email reports.",
    description: "AI-powered personal finance tracker with monthly expense and income tracking, WhatsApp voice-note logging and LLM-generated narrative email reports.",
    categories: ["web", "ai"],
    featured: true,
    stack: [
      "Next.js",
      "TypeScript",
      "MongoDB Atlas",
      "Mongoose",
      "NextAuth",
      "Tailwind CSS",
      "Framer Motion",
      "Recharts",
      "Groq",
      "Brevo",
      "WhatsApp Cloud API",
      "Vercel",
    ],
    live: "https://hissab-kitab-eosin.vercel.app/",
    github: "https://github.com/JAWADAHMAD-18/Hissab_Kitab",
    media: {
      type: "image",
      src: "/media/hisab-kitab/poster.webp",
      alt: "Hisab Kitab personal finance tracker",
    },
    caseStudy: {
      overview: "A personal finance app for tracking income and expenses, logging transactions by voice or WhatsApp, and receiving AI-written email summaries.",
      problem: "A deprecated LLM model began returning 404 errors, breaking voice entry, WhatsApp, and reports. Centralizing model names in one config with an environment override and fallback model restored those flows. The app also handles mixed Urdu, Roman Urdu, and English speech for voice entry.",
      built: [
        "Income and expense logging by voice and WhatsApp, detecting income versus expense from speech.",
        "Per-category and overall budgets with alerts.",
        "AI-written monthly and weekly email summaries, plus PDF statements.",
        "Installable PWA; a native mobile app is coming soon.",
      ],
      architecture: "Next.js full-stack app on Vercel -> MongoDB Atlas; Groq for transcription and extraction; WhatsApp Cloud API webhook; cron-driven emails via Brevo.",
      highlights: "Voice entry handles mixed Urdu, Roman Urdu, and English speech. A centralized model config with an environment override and fallback prevents a deprecated model from breaking voice, WhatsApp, and reports together.",
      roleAndTimeline: "Solo, end to end. About 2 weeks to build; updates and patches continue.",
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
      src: "/media/whatsapp-auto-reply-assistant/poster.webp",
      alt: "WhatsApp Auto-Reply Assistant",
    },
  },
  {
    slug: "biztrack",
    title: "BizTrack",
    tagline: "A business tracking application for managing expenses and sales.",
    description: "A business tracking application for managing expenses and sales, built solo in about a week.",
    categories: ["web"],
    featured: false,
    stack: ["React", "Vite", "Appwrite", "Tailwind CSS", "Material-UI", "Recharts"],
    live: "https://biztrack-j.vercel.app/",
    github: "https://github.com/JAWADAHMAD-18/React-Projects/tree/main/BizTrack",
    media: {
      type: "image",
      src: "/media/biztrack/poster.webp",
      alt: "BizTrack business management dashboard",
    },
  },
  {
    slug: "student-guidance-portal",
    title: "Student Guidance Portal",
    tagline: "A Django web portal for student guidance, with teacher profiles and photo uploads.",
    description: "A Django web portal for student guidance, with teacher profiles and photo uploads, built solo in about a week.",
    categories: ["web"],
    featured: false,
    stack: ["Python", "Django", "HTML templates"],
    live: "https://jawad.pythonanywhere.com/",
    github: "https://github.com/JAWADAHMAD-18/portal",
    media: {
      type: "image",
      src: "/media/student-guidance-portal/poster.webp",
      alt: "Student Guidance Portal",
    },
  },
  {
    slug: "blogging-platform",
    title: "Blogging Platform",
    tagline: "A blog and post management platform with rich text editing.",
    description: "A blog and post management platform with rich text editing, built solo in about a week.",
    categories: ["web"],
    featured: false,
    stack: ["React", "Redux Toolkit", "Appwrite", "TinyMCE", "Tailwind CSS"],
    live: "https://myblog-j.vercel.app/",
    github: "https://github.com/JAWADAHMAD-18/React-Projects/tree/main/megaProject",
    media: {
      type: "image",
      src: "/media/blogging-platform/poster.webp",
      alt: "Blogging Platform",
    },
  },
  {
    slug: "rolex-frontend",
    title: "Rolex Frontend",
    tagline: "An interactive website with 3D animations and luxury service pages.",
    description: "An interactive website with 3D animations and luxury service pages, built solo in about a week.",
    categories: ["web"],
    featured: false,
    stack: ["React", "Three.js", "GSAP", "Tailwind CSS", "Swiper"],
    live: "https://rolex-j.vercel.app/",
    github: "https://github.com/JAWADAHMAD-18/React-Projects/tree/main/Rolex",
    media: {
      type: "image",
      src: "/media/rolex-frontend/poster.webp",
      alt: "Rolex luxury watch website showcase",
    },
  },
  {
    slug: "bata-clone",
    title: "Bata Clone",
    tagline: "A hand-coded clone of the Bata website page, built from scratch.",
    description: "A hand-coded clone of the Bata website page, built from scratch in about 2 weeks.",
    categories: ["web"],
    featured: false,
    stack: ["HTML5", "CSS", "JavaScript", "Framer Motion"],
    live: "https://bata-clone-page.vercel.app/",
    github: "https://github.com/JAWADAHMAD-18/bata-clone-page",
    media: {
      type: "image",
      src: "/media/bata-clone/poster.webp",
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
