import * as React from "react";
import { stackGroups } from "@/data/stack";
import { TechIcon } from "@/components/ui/TechIcon";

export function StackRows() {
  return (
    <section aria-label="Tech Stack" className="w-full py-16 md:py-24 border-t border-border">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2 font-semibold">
            Stack
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-text">
            Technologies I use daily.
          </h2>
        </div>

        {/* Grouped Text Rows */}
        <div className="space-y-4">
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
      </div>
    </section>
  );
}
