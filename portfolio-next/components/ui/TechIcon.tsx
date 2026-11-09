import React from "react";
import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiPython,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiAppwrite,
  SiDocker,
  SiGit,
  SiGithub,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiVercel,
  SiExpo,
  SiSocketdotio,
  SiFramer,
  SiDatacamp,
  SiN8N,
  SiElevenlabs,
  SiGoogle,
  SiJsonwebtokens,
} from "react-icons/si";

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

const ICON_MAP: Record<string, IconType> = {
  react: SiReact,
  "react.js": SiReact,
  "react native": SiReact,
  nextjs: SiNextdotjs,
  "next.js": SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  nodejs: SiNodedotjs,
  "node.js": SiNodedotjs,
  express: SiExpress,
  "express.js": SiExpress,
  django: SiDjango,
  python: SiPython,
  mongodb: SiMongodb,
  mysql: SiMysql,
  redis: SiRedis,
  appwrite: SiAppwrite,
  docker: SiDocker,
  git: SiGit,
  github: SiGithub,
  tailwindcss: SiTailwindcss,
  "tailwind css": SiTailwindcss,
  tailwind: SiTailwindcss,
  html: SiHtml5,
  html5: SiHtml5,
  css: SiCss,
  css3: SiCss,
  vercel: SiVercel,
  expo: SiExpo,
  socketio: SiSocketdotio,
  "socket.io": SiSocketdotio,
  framermotion: SiFramer,
  "framer motion": SiFramer,
  datacamp: SiDatacamp,
  n8n: SiN8N,
  elevenlabs: SiElevenlabs,
  google: SiGoogle,
  "google oauth": SiGoogle,
  jwt: SiJsonwebtokens,
};

function FallbackTechIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function TechIcon({ name, className = "", size = 16 }: TechIconProps) {
  const normalizedKey = name.toLowerCase().trim();
  const IconComponent = ICON_MAP[normalizedKey];

  if (!IconComponent) {
    return <FallbackTechIcon className={className} size={size} />;
  }

  return (
    <span
      className={`inline-flex items-center justify-center text-currentColor ${className}`}
      aria-hidden="true"
    >
      <IconComponent size={size} className="text-currentColor" aria-hidden="true" />
    </span>
  );
}
