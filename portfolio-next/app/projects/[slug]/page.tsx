import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, getBySlug } from "@/data/projects";
import { CaseStudySection } from "@/components/projects/CaseStudySection";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { AudioPlayer } from "@/components/projects/AudioPlayer";
import { TodoBlock } from "@/components/projects/TodoBlock";
import { DeviceFrame } from "@/components/media/DeviceFrame";
import { VideoLoop } from "@/components/media/VideoLoop";
import { TechIcon } from "@/components/ui/TechIcon";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Jawad Ahmad`,
      description: project.tagline || project.description,
      url: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getBySlug(slug);

  if (!project) {
    notFound();
  }

  // Find next project for the footer navigation
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const displayUrl = project.live
    ? project.live.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `${project.slug}.internal`;
  const problem = project.caseStudy?.problem;
  const highlights = project.caseStudy?.highlights;
  const hasConfirmedCopy = (value?: string) =>
    Boolean(value && !/\[(?:FILL|CONFIRM)\b/i.test(value));

  return (
    <div className="w-full py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-text transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all projects</span>
        </Link>

        {/* Project Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {project.categories.map((cat) => (
              <span
                key={cat}
                className="font-mono text-xs uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-surface-2 border border-border text-muted font-medium"
              >
                {cat}
              </span>
            ))}
            {project.featured && (
              <span className="font-mono text-xs uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-accent/15 text-accent-text dark:text-accent font-semibold">
                Featured Case Study
              </span>
            )}
          </div>

          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-[-0.03em] leading-[1.05] text-text mb-4">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-muted leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* 2-Column Case Study Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Case Study Content (8 cols) */}
          <div className="lg:col-span-8 space-y-2">
            {/* 1. Hero Preview / Media Top */}
            <div className="rounded-xl border border-border bg-surface p-4 sm:p-6 mb-8 shadow-xs">
              <DeviceFrame
                type="browser"
                url={displayUrl}
                title={project.title}
                className="w-full shadow-sm"
              >
                <VideoLoop
                  poster={project.media?.src || "/media/tripfusion/poster.webp"}
                  alt={project.media?.alt || `${project.title} case study media`}
                  priority
                />
              </DeviceFrame>
            </div>

            {/* 2. Overview Section */}
            <CaseStudySection id="overview" badge="01 / Overview" title="Project Overview">
              <p className="text-base text-text leading-relaxed">
                {project.caseStudy?.overview || project.description}
              </p>
            </CaseStudySection>

            {/* 3. The Problem Section */}
            <CaseStudySection id="problem" badge="02 / The Challenge" title="The Problem">
              {hasConfirmedCopy(problem) ? (
                <p className="text-base text-text leading-relaxed">
                  {problem}
                </p>
              ) : (
                <TodoBlock label="[FILL]">
                  Add the confirmed problem statement for {project.title}.
                </TodoBlock>
              )}
            </CaseStudySection>

            {/* 4. What I Built */}
            <CaseStudySection id="built" badge="03 / Architecture" title="What I Built">
              {project.caseStudy?.built && project.caseStudy.built.length > 0 ? (
                <ul className="space-y-3">
                  {project.caseStudy.built.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-base text-text">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-base text-text leading-relaxed">
                  {project.description}
                </p>
              )}
            </CaseStudySection>

            {/* 5. How It Works (Architecture Diagram) */}
            <CaseStudySection id="how-it-works" badge="04 / Flow" title="How It Works">
              <ArchitectureDiagram projectSlug={project.slug} />
            </CaseStudySection>

            {/* 6. Special Audio Demo (Ahmed Voice Agent) */}
            {project.slug === "ahmed-ai-voice-receptionist" && (
              <CaseStudySection id="audio-demo" badge="05 / Live Audio" title="Real-time Voice Demo">
                <p className="text-sm text-muted mb-4">
                  Listen to a demonstration call recording with synchronized line-by-line transcript playback.
                </p>
                <AudioPlayer
                  src="/audio/ahmed-demo.mp3"
                  transcriptSrc="/audio/ahmed-demo-transcript.json"
                  title="Ahmed — Clinic Call Demo"
                />
              </CaseStudySection>
            )}

            {/* 7. Highlights / Hard Parts */}
            <CaseStudySection id="highlights" badge="06 / Engineering" title="Key Highlights & Trade-offs">
              {hasConfirmedCopy(highlights) ? (
                <p className="text-base text-text leading-relaxed">
                  {highlights}
                </p>
              ) : (
                <TodoBlock label="[FILL]">
                  Add confirmed engineering highlights for {project.title}.
                </TodoBlock>
              )}
            </CaseStudySection>

            {/* 8. Media Gallery */}
            <CaseStudySection id="gallery" badge="07 / Visuals" title="Interface Gallery">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-surface p-2 overflow-hidden shadow-2xs">
                  <DeviceFrame type="browser" url={displayUrl} title={`${project.title} View 1`}>
                    <VideoLoop
                      poster={project.media?.src || "/media/tripfusion/poster.webp"}
                      alt={`${project.title} screenshot view 1`}
                    />
                  </DeviceFrame>
                </div>
                {project.categories.includes("mobile") && (
                  <div className="rounded-xl border border-border bg-surface p-2 overflow-hidden shadow-2xs flex items-center justify-center bg-surface-2/30">
                    <div className="w-[180px]">
                      <DeviceFrame type="phone" title={`${project.title} Mobile Screen`}>
                        <VideoLoop
                          poster="/media/tripfusion/phone.webp"
                          alt={`${project.title} mobile screenshot`}
                        />
                      </DeviceFrame>
                    </div>
                  </div>
                )}
              </div>
            </CaseStudySection>
          </div>

          {/* Sticky Side Summary Column (4 cols) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="rounded-xl border border-border bg-surface p-6 shadow-xs space-y-6">
              {/* Role & Timeline */}
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-muted mb-1 font-semibold">
                  Role & Timeline
                </p>
                <p className="text-sm font-medium text-text">
                  {hasConfirmedCopy(project.caseStudy?.roleAndTimeline)
                    ? project.caseStudy?.roleAndTimeline
                    : null}
                </p>
                {!hasConfirmedCopy(project.caseStudy?.roleAndTimeline) && (
                  <TodoBlock label="[FILL]">
                    Specific project timeframe and role.
                  </TodoBlock>
                )}
              </div>

              {/* Categories */}
              <div className="border-t border-border/70 pt-4">
                <p className="font-mono text-xs uppercase tracking-wider text-muted mb-2 font-semibold">
                  Platform
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.categories.map((c) => (
                    <span
                      key={c}
                      className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-surface-2 text-text border border-border"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Full Tech Stack */}
              <div className="border-t border-border/70 pt-4">
                <p className="font-mono text-xs uppercase tracking-wider text-muted mb-3 font-semibold">
                  Technology Stack
                </p>
                <div className="space-y-2">
                  {project.stack.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-2.5 text-xs text-text font-mono"
                    >
                      <TechIcon name={tech} size={15} />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Links */}
              <div className="border-t border-border/70 pt-4 space-y-2.5">
                <p className="font-mono text-xs uppercase tracking-wider text-muted mb-2 font-semibold">
                  Project Links
                </p>

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-full bg-accent text-on-accent hover:bg-accent-2 font-medium text-xs transition-colors shadow-xs"
                  >
                    <span>Visit Live Application</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}

                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-full border border-border bg-surface text-text hover:border-accent text-xs font-medium transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <TechIcon name="github" size={14} />
                      View Source Repository
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted" />
                  </a>
                ) : (
                  <TodoBlock label="[FILL]">
                    GitHub URL for {project.title} (if public repository).
                  </TodoBlock>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* Next Project Footer Bar */}
        <div className="mt-20 pt-10 border-t border-border flex items-center justify-between">
          <Link
            href="/projects"
            className="font-mono text-xs text-muted hover:text-text transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Projects</span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group inline-flex items-center gap-2 text-right"
          >
            <div>
              <span className="block font-mono text-[11px] uppercase tracking-wider text-muted">
                Next Project
              </span>
              <span className="text-base sm:text-lg font-semibold text-text group-hover:text-accent-text dark:group-hover:text-accent transition-colors">
                {nextProject.title}
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-muted group-hover:text-accent-text dark:group-hover:text-accent group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
}
