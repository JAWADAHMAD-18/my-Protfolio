import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TechIcon } from "@/components/ui/TechIcon";

interface Capability {
  number: string;
  title: string;
  description: string;
  stack: string[];
  example: { label: string; href: string };
}

const CAPABILITIES: Capability[] = [
  {
    number: "01",
    title: "Full-stack web",
    description:
      "Production web apps with authentication, dashboards and real-time features.",
    stack: ["Next.js", "React", "Node.js", "Express", "Django", "MongoDB", "Redis"],
    example: { label: "TripFusion", href: "/projects/tripfusion" },
  },
  {
    number: "02",
    title: "Mobile apps",
    description:
      "React Native and Expo apps that share a backend with the web product.",
    stack: ["React Native", "Expo", "TypeScript"],
    example: { label: "TripFusion mobile", href: "/projects/tripfusion" },
  },
  {
    number: "03",
    title: "AI solutions",
    description:
      "Voice agents, chat assistants and workflow automation built on LLM APIs.",
    stack: ["VAPI", "ElevenLabs", "n8n", "Groq"],
    example: {
      label: "Ahmed, AI Voice Receptionist",
      href: "/projects/ahmed-ai-voice-receptionist",
    },
  },
];

export function WhatIDo() {
  return (
    <section aria-label="What I do" className="w-full py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2 font-semibold">
            What I Do
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-tight text-text">
            Three ways I can help.
          </h2>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.number}
              className="flex flex-col justify-between p-6 sm:p-8 rounded-xl border border-border bg-surface"
            >
              <div>
                {/* Mono Number */}
                <span className="block font-mono text-xs font-bold text-accent-text dark:text-accent mb-4">
                  {cap.number}
                </span>

                {/* Title */}
                <h3 className="text-xl font-semibold text-text mb-3">
                  {cap.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted leading-relaxed mb-6">
                  {cap.description}
                </p>

                {/* Stack Row */}
                <div className="mb-6">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted mb-2 font-semibold">
                    Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cap.stack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2 py-0.5 rounded-full bg-surface-2 border border-border/70 text-muted"
                      >
                        <TechIcon name={tech} size={12} />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Example Link */}
              <div className="pt-2 border-t border-border/60">
                <Link
                  href={cap.example.href}
                  className="group inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-accent-text dark:hover:text-accent transition-colors"
                >
                  <span className="font-semibold">Example:</span>
                  <span>{cap.example.label}</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
