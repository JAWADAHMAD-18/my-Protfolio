import * as React from "react";

interface Step {
  number: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the problem, the users and the constraints.",
  },
  {
    number: "02",
    title: "Design",
    description: "Agree on scope, flows and the shape of the system.",
  },
  {
    number: "03",
    title: "Build",
    description: "Ship in small steps you can see and test.",
  },
  {
    number: "04",
    title: "Ship",
    description: "Deploy, monitor and hand over cleanly.",
  },
];

export function Process() {
  return (
    <section aria-label="Process" className="w-full py-16 md:py-24 border-t border-border">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2 font-semibold">
            Methodology
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-text">
            How I work.
          </h2>
        </div>

        {/* 4 Steps in One Line (stacked on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="p-6 rounded-[16px] border border-border bg-surface"
            >
              <span className="block font-mono text-xs font-bold text-accent-text dark:text-accent mb-3">
                {step.number}
              </span>
              <h3 className="text-lg font-semibold text-text mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
