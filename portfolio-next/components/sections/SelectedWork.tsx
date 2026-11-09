import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getFeatured } from "@/data/projects";
import { DeviceFrame } from "@/components/media/DeviceFrame";
import { VideoLoop } from "@/components/media/VideoLoop";
import { TechIcon } from "@/components/ui/TechIcon";

export function SelectedWork() {
  const featuredProjects = getFeatured();

  return (
    <section
      id="work"
      aria-label="Selected Work"
      className="w-full py-16 md:py-24"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 md:mb-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2 font-semibold">
              Selected Work
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-tight text-text">
              Things I&apos;ve built and shipped.
            </h2>
          </div>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-1.5 font-mono text-sm text-muted hover:text-accent-text dark:hover:text-accent transition-colors shrink-0"
          >
            <span>See all projects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Sticky Stacking Cards Container */}
        <div className="relative flex flex-col gap-8 md:gap-10">
          {featuredProjects.map((project, index) => {
            // CSS Sticky offset per card for cascading stack
            const topOffset = `${5.5 + index * 1.5}rem`;

            return (
              <article
                key={project.slug}
                style={{ top: topOffset }}
                className="lg:sticky rounded-[20px] border border-border bg-surface p-6 sm:p-8 md:p-10 shadow-sm hover:border-accent"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  {/* Left Column: Information & Actions */}
                  <div className="lg:col-span-6 flex flex-col items-start order-2 lg:order-1">
                    {/* Categories Pill */}
                    <div className="flex items-center gap-2 mb-3">
                      {project.categories.map((cat) => (
                        <span
                          key={cat}
                          className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-surface-2 border border-border text-muted"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text mb-3">
                      {project.title}
                    </h3>

                    {/* Outcome line / Tagline */}
                    <p className="text-muted text-base leading-relaxed mb-6">
                      {project.tagline}
                    </p>

                    {/* 4-6 Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {project.stack.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs px-2.5 py-1 rounded-[8px] bg-surface-2/80 border border-border/80 text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 6 && (
                        <span className="font-mono text-xs px-2 py-1 text-muted">
                          +{project.stack.length - 6}
                        </span>
                      )}
                    </div>

                    {/* Links Row */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-accent text-on-accent hover:bg-accent-2 transition-colors shadow-xs"
                      >
                        <span>Case study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full border border-border bg-surface text-text hover:border-accent transition-colors"
                        >
                          <span>Live demo</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-muted" />
                        </a>
                      )}

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full border border-border bg-surface text-muted hover:text-text hover:border-accent flex items-center justify-center transition-colors"
                          aria-label={`View ${project.title} source code on GitHub`}
                        >
                          <TechIcon name="github" size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: DeviceFrame Media */}
                  <div className="lg:col-span-6 w-full order-1 lg:order-2">
                    <div className="relative mx-auto max-w-[500px] lg:max-w-none">
                      <DeviceFrame
                        type="browser"
                        url={project.live ? project.live.replace(/^https?:\/\//, "").replace(/\/$/, "") : `${project.slug}.internal`}
                        title={project.title}
                        className="w-full shadow-md"
                      >
                        <VideoLoop
                          poster={project.media?.src || "/media/tripfusion/poster.webp"}
                          alt={project.media?.alt || `${project.title} preview`}
                          sizes="(max-width: 1024px) 90vw, 480px"
                        />
                      </DeviceFrame>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom "See all projects" CTA link */}
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-surface text-sm font-medium text-text hover:border-accent hover:text-accent-text dark:hover:text-accent transition-colors shadow-xs"
          >
            <span>Explore all projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
