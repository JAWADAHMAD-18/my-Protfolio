export interface Service {
  number: string;
  title: string;
  short: string;
  description: string;
  stack: string[];
  example: string;
  cta: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    number: "01",
    title: "Full-stack web",
    short: "Production web apps with authentication, dashboards and real-time features.",
    description: "A responsive web app with a clean UI; secure authentication (access and refresh tokens, OAuth); APIs, database and admin or dashboard views; deployed and documented.",
    stack: [
      "Next.js",
      "React",
      "Node.js",
      "Express",
      "Django",
      "MongoDB",
      "MySQL",
      "Redis",
      "Tailwind CSS",
    ],
    example: "TripFusion, Hisab Kitab",
    cta: "Start a web project",
  },
  {
    number: "02",
    title: "Mobile apps",
    short: "React Native and Expo apps that share a backend with the web product.",
    description: "A React Native app built with Expo, sharing the same backend and auth as your web product; real-time features such as chat where needed.",
    stack: ["React Native", "Expo", "TypeScript", "Socket.io"],
    example: "TripFusion mobile",
    cta: "Start a mobile project",
  },
  {
    number: "03",
    title: "AI solutions",
    short: "Voice agents, chat assistants and workflow automation built on LLM APIs.",
    description: "AI voice receptionists, chat assistants, WhatsApp automations and workflow automation that connect to your calendar, email or database.",
    stack: ["VAPI", "ElevenLabs", "n8n", "Groq", "Whisper"],
    example: "Ahmed, AI Voice Receptionist; WhatsApp Auto-Reply Assistant",
    cta: "Start an AI project",
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description: "Understand the problem, the users and the constraints.",
  },
  {
    step: "02",
    title: "Design",
    description: "Agree on scope, flows and the shape of the system.",
  },
  {
    step: "03",
    title: "Build",
    description: "Ship in small steps you can see and test.",
  },
  {
    step: "04",
    title: "Ship",
    description: "Deploy, monitor and hand over cleanly.",
  },
];
