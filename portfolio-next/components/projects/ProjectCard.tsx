import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { DeviceFrame } from "@/components/media/DeviceFrame";
import { VideoLoop } from "@/components/media/VideoLoop";
import { TechIcon } from "@/components/ui/TechIcon";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const displayUrl = project.live
    ? project.live.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `${project.slug}.internal`;

  return (
    <article className="group flex flex-col rounded-[16px] border border-border bg-surface overflow-hidden shadow-xs transition-colors duration-200 hover:border-accent">
      {/* Media on Top (DeviceFrame or 16:9 container) */}
      <div className="p-4 sm:p-5 pb-0 bg-surface-2/40 border-b border-border/60">
        <DeviceFrame
          type="browser"
          url={displayUrl}
          title={project.title}
          className="w-full shadow-sm"
        >
          <VideoLoop
            poster={project.media?.src || "/portfolioTrip.png"}
            alt={project.media?.alt || `${project.title} preview`}
          />
        </DeviceFrame>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
          {project.categories.map((cat) => (
            <span
              key={cat}
              className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-surface-2 border border-border text-muted"
            >
              {cat}
            </span>
          ))}
          {featured && (
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/15 text-accent-text dark:text-accent font-semibold">
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold tracking-tight text-text mb-2 group-hover:text-accent-text dark:group-hover:text-accent transition-colors">
          <Link href={`/projects/${project.slug}`} className="focus:outline-none">
            {project.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-5 flex-1">
          {project.description}
        </p>

        {/* Stack Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] px-2 py-0.5 rounded-[6px] bg-surface-2 border border-border/70 text-muted"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="font-mono text-[11px] px-1.5 py-0.5 text-muted">
              +{project.stack.length - 5}
            </span>
          )}
        </div>

        {/* Links Row */}
        <div className="flex items-center justify-between pt-3 border-t border-border/60 mt-auto">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-text hover:text-accent-text dark:hover:text-accent transition-colors"
          >
            <span>Read case study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-2">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-border bg-surface text-muted hover:text-text hover:border-accent flex items-center justify-center transition-colors"
                aria-label={`Open ${project.title} live link`}
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-border bg-surface text-muted hover:text-text hover:border-accent flex items-center justify-center transition-colors"
                aria-label={`View ${project.title} source code on GitHub`}
              >
                <TechIcon name="github" size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
