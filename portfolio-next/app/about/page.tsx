import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, GraduationCap, Award, Layers } from "lucide-react";
import { stackGroups } from "@/data/stack";
import { certifications } from "@/data/certifications";
import { siteConfig } from "@/data/site";
import { TechIcon } from "@/components/ui/TechIcon";
import { TodoBlock } from "@/components/projects/TodoBlock";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, technical stack, education, and verified certifications of Jawad Ahmad, full-stack and AI application engineer.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Jawad Ahmad",
    description:
      "Background, technical stack, education, and verified certifications of Jawad Ahmad.",
    url: "/about",
  },
};

// Real testimonials definition. Currently supervisor testimonial requires [CONFIRM] per CONTENT.md.
interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const REAL_TESTIMONIALS: Testimonial[] = [];

export default function AboutPage() {
  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 md:mb-18">
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2 font-semibold">
            Background & Credentials
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-tight text-text mb-6">
            About me.
          </h1>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            Full-stack and AI application engineer with 2+ years of hands-on building across web platforms, companion mobile apps, and LLM automation systems.
          </p>
        </div>

        {/* 2-Column Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20 md:mb-24">
          <div className="lg:col-span-8 space-y-5 text-base sm:text-lg text-text leading-relaxed">
            <p>
              I graduated with a BS in Computer Science from the Islamia University of Bahawalpur (2022–2026). Over the past two years, my focus has been on turning ideas into reliable, production-ready software.
            </p>
            <p>
              I develop full-stack web applications using React, Next.js, Node.js, and Django, alongside cross-platform mobile apps in React Native and Expo that share the same backend infrastructure.
            </p>
            <p>
              For my final year project, <strong className="font-semibold text-text">TripFusion</strong>, I engineered an AI-assisted travel platform with token-based authentication (access and refresh tokens), real-time customer support chat over WebSockets, and a synchronized mobile app.
            </p>
            <p>
              Currently, I am going deeper into AI automation, conversational voice receptionists (VAPI and ElevenLabs), and TypeScript architecture.
            </p>

            <TodoBlock label="[FILL]">
              One personal line on engineering principles or work philosophy. (Hidden in production).
            </TodoBlock>

            <div className="pt-4 p-6 rounded-[16px] bg-surface-2/60 border border-border/80 text-sm text-muted">
              <p>
                For teams and businesses, I also take on studio engagements through{" "}
                <a
                  href={siteConfig.links.zalvro}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-text dark:text-accent font-medium underline inline-flex items-center gap-1"
                >
                  <span>Zalvro</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                , focusing on custom AI automation workflows and web development.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="relative max-w-[280px] lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -inset-1.5 rounded-[28px] border border-accent/30 shadow-[0_0_0_5px_rgba(72,208,168,0.1)]"
              />
              <div className="relative overflow-hidden rounded-[24px] bg-[#121415] ring-1 ring-accent/35">
                <Image
                  src="/media/profile/jawad-about.webp"
                  alt="Jawad Ahmad, full-stack and AI engineer"
                  width={427}
                  height={585}
                  loading="lazy"
                  unoptimized
                  sizes="(max-width: 1024px) 280px, 360px"
                  className="h-auto w-full"
                />
              </div>
            </div>

            {/* Quick Facts Card */}
            <div className="p-6 rounded-[16px] border border-border bg-surface space-y-4">
              <p className="font-mono text-xs uppercase tracking-wider text-muted font-semibold">
                Quick Summary
              </p>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-muted block text-xs font-mono">Degree</span>
                  <span className="font-medium text-text">BS Computer Science</span>
                </div>
                <div>
                  <span className="text-muted block text-xs font-mono">Alma Mater</span>
                  <span className="font-medium text-text">Islamia University of Bahawalpur</span>
                </div>
                <div>
                  <span className="text-muted block text-xs font-mono">Experience</span>
                  <span className="font-medium text-text">2+ Years Production Building</span>
                </div>
                <div>
                  <span className="text-muted block text-xs font-mono">Primary Focus</span>
                  <span className="font-medium text-text">Web, Mobile & AI Voice Systems</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Stack Section with id="stack" */}
        <section id="stack" className="border-t border-border pt-16 md:pt-20 mb-20 md:mb-24">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-accent-text dark:text-accent" />
            <p className="font-mono text-xs uppercase tracking-widest text-muted font-semibold">
              Technical Stack
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-text mb-4">
            Technologies I use daily.
          </h2>
          <p className="text-sm sm:text-base text-muted mb-10 max-w-[65ch]">
            Grouped by architectural layer. No arbitrary percentages or skill bars—just tools used in real projects.
          </p>

          <div className="space-y-6">
            {stackGroups.map((group) => (
              <div
                key={group.category}
                className="p-5 sm:p-6 rounded-[16px] border border-border bg-surface flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="w-48 shrink-0">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted font-semibold">
                    {group.category}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 flex-1">
                  {group.items.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-surface-2 border border-border/70 text-xs font-mono text-text"
                    >
                      <TechIcon name={tech} size={15} />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="border-t border-border pt-16 md:pt-20 mb-20 md:mb-24">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-4 h-4 text-accent-text dark:text-accent" />
            <p className="font-mono text-xs uppercase tracking-widest text-muted font-semibold">
              Education
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-text mb-8">
            Academic Background
          </h2>

          <div className="p-6 sm:p-8 rounded-[16px] border border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-text mb-1">
                Bachelor of Science in Computer Science
              </h3>
              <p className="text-sm text-muted">
                Islamia University of Bahawalpur
              </p>
            </div>
            <div className="font-mono text-xs text-muted px-3 py-1.5 rounded-full bg-surface-2 border border-border shrink-0 self-start sm:self-auto">
              2022 — 2026
            </div>
          </div>
        </section>

        {/* Certifications Strip with id="certifications" */}
        <section id="certifications" className="border-t border-border pt-16 md:pt-20 mb-20 md:mb-24">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-accent-text dark:text-accent" />
            <p className="font-mono text-xs uppercase tracking-widest text-muted font-semibold">
              Verified Credentials
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-text mb-3">
            Certifications
          </h2>
          <p className="text-sm sm:text-base text-muted mb-8 max-w-[65ch]">
            Professional DataCamp certifications in embeddings, deep learning, prompt engineering, and Python efficiency.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <a
                key={cert.name}
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-[14px] border border-border bg-surface hover:border-accent flex flex-col justify-between gap-4 transition-colors shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                      {cert.issuer}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent-text dark:group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="text-sm font-semibold text-text group-hover:text-accent-text dark:group-hover:text-accent transition-colors line-clamp-2">
                    {cert.name}
                  </h3>
                </div>

                <span className="font-mono text-[11px] text-accent-text dark:text-accent font-medium">
                  Verify statement &rarr;
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Testimonial Section (Renders ONLY when real testimonial data exists) */}
        {REAL_TESTIMONIALS.length > 0 && (
          <section className="border-t border-border pt-16 md:pt-20">
            <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2 font-semibold">
              Testimonials
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-text mb-8">
              Supervisor & Client Feedback
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {REAL_TESTIMONIALS.map((t, idx) => (
                <blockquote
                  key={idx}
                  className="p-6 rounded-[16px] border border-border bg-surface"
                >
                  <p className="text-base text-text italic mb-4 leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer>
                    <span className="block font-semibold text-sm text-text">
                      {t.author}
                    </span>
                    <span className="block text-xs text-muted">
                      {t.role}
                    </span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>
        )}

        {/* Development TODO for Testimonial */}
        <TodoBlock label="[CONFIRM]">
          Supervisor testimonial quote and permission confirmation needed before public release.
        </TodoBlock>
      </div>
    </div>
  );
}
