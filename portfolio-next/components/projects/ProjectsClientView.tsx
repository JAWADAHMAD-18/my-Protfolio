"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, type ProjectCategory } from "@/data/projects";
import { ProjectFilter, type FilterValue } from "./ProjectFilter";
import { ProjectCard } from "./ProjectCard";
import { TechIcon } from "@/components/ui/TechIcon";

export function ProjectsClientView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type") as ProjectCategory | null;

  // Single source of truth directly derived from URL query parameters
  const currentFilter: FilterValue =
    typeParam && ["web", "mobile", "ai"].includes(typeParam)
      ? typeParam
      : "all";

  const handleFilterChange = (filter: FilterValue) => {
    const params = new URLSearchParams(searchParams.toString());
    if (filter === "all") {
      params.delete("type");
    } else {
      params.set("type", filter);
    }
    const query = params.toString() ? `?${params.toString()}` : "";
    router.replace(`${pathname}${query}`, { scroll: false });
  };

  const counts = React.useMemo(() => {
    return {
      all: projects.length,
      web: projects.filter((p) => p.categories.includes("web")).length,
      mobile: projects.filter((p) => p.categories.includes("mobile")).length,
      ai: projects.filter((p) => p.categories.includes("ai")).length,
    };
  }, []);

  const filteredProjects = React.useMemo(() => {
    if (currentFilter === "all") return projects;
    return projects.filter((p) => p.categories.includes(currentFilter));
  }, [currentFilter]);

  const featured = React.useMemo(() => {
    return filteredProjects.filter((p) => p.featured);
  }, [filteredProjects]);

  const moreProjects = React.useMemo(() => {
    return filteredProjects.filter((p) => !p.featured);
  }, [filteredProjects]);

  return (
    <div className="w-full py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="flex flex-col items-start gap-4 mb-10 md:mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-muted font-semibold">
            Projects Portfolio
          </p>
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-[-0.03em] leading-[1.05] text-text">
            Things I&apos;ve built and shipped.
          </h1>
          <p className="text-muted text-base sm:text-lg max-w-[65ch] leading-relaxed">
            Production web platforms, mobile apps, and conversational AI systems. Every project built end to end.
          </p>

          {/* Filter Pills */}
          <div className="pt-2">
            <ProjectFilter
              currentFilter={currentFilter}
              onFilterChange={handleFilterChange}
              counts={counts}
            />
          </div>
        </div>

        {/* Featured Projects Grid */}
        {featured.length > 0 && (
          <div className="mb-16 md:mb-20">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <h2 className="font-mono text-xs uppercase tracking-wider text-muted font-semibold">
                Featured Case Studies
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featured.map((project) => (
                <ProjectCard key={project.slug} project={project} featured />
              ))}
            </div>
          </div>
        )}

        {/* More Projects Section (Compact List) */}
        {moreProjects.length > 0 && (
          <div className="border-t border-border pt-12 md:pt-16">
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="font-mono text-xs uppercase tracking-wider text-muted font-semibold">
                More Projects ({moreProjects.length})
              </h2>
            </div>

            <div className="divide-y divide-border border-y border-border">
              {moreProjects.map((project) => (
                <div
                  key={project.slug}
                  className="group py-5 sm:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:bg-surface-2/40 -mx-3 px-3 rounded-xl"
                >
                  {/* Left: Title + Tagline */}
                  <div className="flex-1 max-w-xl">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="text-lg font-semibold text-text group-hover:text-accent-text dark:group-hover:text-accent transition-colors"
                      >
                        {project.title}
                      </Link>
                      <div className="flex gap-1">
                        {project.categories.map((c) => (
                          <span
                            key={c}
                            className="font-mono text-[10px] uppercase px-1.5 py-0.2 rounded bg-surface-2 text-muted border border-border"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Middle: Stack Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 md:max-w-xs">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-surface-2 border border-border/70 text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-text hover:text-accent-text dark:hover:text-accent transition-colors"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full border border-border bg-surface text-muted hover:text-text hover:border-accent flex items-center justify-center transition-colors"
                        aria-label={`Open ${project.title} live demo`}
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
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <TechIcon name="github" size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 border border-dashed border-border rounded-xl">
            <p className="text-muted text-base mb-4">No projects found matching category &quot;{currentFilter}&quot;.</p>
            <button
              type="button"
              onClick={() => handleFilterChange("all")}
              className="px-4 py-2 rounded-full bg-accent text-on-accent text-sm font-medium hover:bg-accent-2 transition-colors cursor-pointer"
            >
              Reset filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
