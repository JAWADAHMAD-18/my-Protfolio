export interface StackGroup {
  category: string;
  items: string[];
}

export const stackGroups: StackGroup[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Mobile",
    items: ["React Native", "Expo"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Django", "Socket.io"],
  },
  {
    category: "Data",
    items: ["MongoDB", "MySQL", "Redis", "Appwrite"],
  },
  {
    category: "AI & Automation",
    items: ["Groq", "VAPI", "ElevenLabs", "n8n", "Whisper"],
  },
  {
    category: "Tools & Platforms",
    items: ["Git", "GitHub", "Docker", "Vercel"],
  },
];
