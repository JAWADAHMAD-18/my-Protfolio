"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { ProjectCategory } from "@/data/projects";

export type FilterValue = ProjectCategory | "all";

interface ProjectFilterProps {
  currentFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
  counts: {
    all: number;
    web: number;
    mobile: number;
    ai: number;
  };
}

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
  { label: "AI", value: "ai" },
];

function FilterContent({
  currentFilter,
  onFilterChange,
  counts,
}: ProjectFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelect = (val: FilterValue) => {
    onFilterChange(val);
    const params = new URLSearchParams(searchParams.toString());
    if (val === "all") {
      params.delete("type");
    } else {
      params.set("type", val);
    }
    const query = params.toString() ? `?${params.toString()}` : "";
    router.replace(`${pathname}${query}`, { scroll: false });
  };

  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="flex flex-wrap items-center gap-2"
    >
      {FILTERS.map((filter) => {
        const isActive = currentFilter === filter.value;
        const count = counts[filter.value];

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => handleSelect(filter.value)}
            aria-pressed={isActive}
            className={`font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-colors cursor-pointer flex items-center gap-2 ${
              isActive
                ? "bg-accent text-on-accent border-accent font-semibold shadow-xs"
                : "bg-surface border-border text-muted hover:text-text hover:border-accent"
            }`}
          >
            <span>{filter.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? "bg-black/20 text-on-accent" : "bg-surface-2 text-muted"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function ProjectFilter(props: ProjectFilterProps) {
  return (
    <React.Suspense
      fallback={
        <div className="flex gap-2 h-9 items-center font-mono text-xs text-muted">
          Loading filters...
        </div>
      }
    >
      <FilterContent {...props} />
    </React.Suspense>
  );
}
