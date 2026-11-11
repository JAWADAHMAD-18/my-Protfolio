import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, GraduationCap, Award, Layers } from "lucide-react";
import { stackGroups } from "@/data/stack";
import { certifications } from "@/data/certifications";
import { siteConfig } from "@/data/site";
import { TechIcon } from "@/components/ui/TechIcon";

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

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const REAL_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The UI and UX are both good, but the backend optimization is excellent. Even large API data loads within seconds, with good use of Redis.",
    author: "Dr. Akmal",
    role: "FYP Supervisor, Department of Computer Science, Islamia University of Bahawalpur (IUB)",
  },
];

export default function AboutPage() {
  return (
    <div className="w-full py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-x-12 md:gap-y-8 mb-20 md:mb-24">
          {/* Header */}
          <div className="md:col-span-8 md:col-start-1 md:row-start-1">
            <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2 font-semibold">
              Background & Credentials
            </p>
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-[-0.03em] leading-[1.05] text-text mb-6">
              About me.
            </h1>
            <p className="text-muted text-base sm:text-lg leading-relaxed">
              I&apos;m Jawad, a full-stack and AI application engineer.
            </p>
          </div>

          <div className="flex justify-center md:col-span-4 md:col-start-9 md:row-span-2 md:row-start-1 md:sticky md:top-24 md:justify-end self-start">
            <div className="relative aspect-[4/5] w-[144px] sm:w-[168px] md:w-full md:max-w-[340px] overflow-hidden rounded-xl border border-border bg-surface">
              <Image
                src="/media/profile/jawad-about.webp"
                alt="Jawad Ahmad, full-stack and AI engineer"
                width={447}
                height={558}
                loading="lazy"
                sizes="(min-width: 1180px) 340px, (min-width: 768px) calc(33.333vw - 53.33px), (min-width: 640px) 168px, 144px"
                className="absolute inset-0 h-full w-full object-cover object-[center_15%]"
              />
            </div>
          </div>

          <div className="space-y-5 text-base sm:text-lg text-text leading-relaxed md:col-span-8 md:col-start-1 md:row-start-2">
            <p>
              I graduated with a BS in Computer Science from the Islamia University of Bahawalpur (2022–2026).
            </p>
            <p>
              I&apos;ve been building for 2+ years: web apps with React, Next.js, Node.js and Django, mobile apps with React Native, and AI systems such as voice agents and automations.
            </p>
            <p>
              My final year project, <strong className="font-semibold text-text">TripFusion</strong>, is a full-stack travel platform with real-time chat, token-based auth and a mobile app on the same backend.
            </p>
            <p>
              I&apos;m currently going deeper into AI automation, conversational voice agents and TypeScript.
            </p>

            <p>
              I value clear communication and steady progress, with working software to review along the way.
            </p>

            <div className="pt-4 p-6 rounded-xl bg-surface-2/60 border border-border/80 text-sm text-muted">
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
                , my AI automation and web development studio.
              </p>
            </div>

            <aside>
              {/* Quick Facts Card */}
              <div className="p-6 rounded-xl border border-border bg-surface space-y-4">
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

            <section className="border-t border-border pt-8 mt-8">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-4 h-4 text-accent-text dark:text-accent" />
                <p className="font-mono text-xs uppercase tracking-widest text-muted font-semibold">
                  Education
                </p>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-text mb-8">
                Academic Background
              </h2>

              <div className="space-y-4">
                <div className="p-6 sm:p-8 rounded-xl border border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

                <div className="p-6 sm:p-8 rounded-xl border border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-text mb-1">
                      Pre-Engineering (FSc)
                    </h3>
                    <p className="text-sm text-muted">
                      Punjab College Hasilpur
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                    <div className="font-mono text-xs text-muted px-3 py-1.5 rounded-full bg-surface-2 border border-border shrink-0">
                      2020 — 2022
                    </div>
                    <div className="font-mono text-xs text-muted px-3 py-1.5 rounded-full bg-surface-2 border border-border shrink-0">
                      Grade A
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
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
                className="p-5 sm:p-6 rounded-xl border border-border bg-surface flex flex-col md:flex-row md:items-center justify-between gap-4"
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
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-2 border border-border/70 text-xs font-mono text-text"
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

          <div className="divide-y divide-border border-y border-border">
            {certifications.map((cert) => (
              <a
                key={cert.name}
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 py-4 transition-colors hover:text-accent-text dark:hover:text-accent sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <span className="text-sm font-semibold text-text group-hover:text-accent-text dark:group-hover:text-accent">
                  {cert.name}
                </span>
                <span className="inline-flex items-center gap-2 font-mono text-[11px] text-muted group-hover:text-accent-text dark:group-hover:text-accent">
                  {cert.issuer} <span>·</span> Verify statement
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
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
                  className="p-6 rounded-xl border border-border bg-surface"
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

      </div>
    </div>
  );
}
