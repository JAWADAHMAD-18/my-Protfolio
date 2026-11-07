import * as React from "react";

interface ProofItem {
  index: string;
  statement: string;
}

const PROOF_ITEMS: ProofItem[] = [
  {
    index: "01",
    statement: "Web and mobile apps running on one shared backend (TripFusion)",
  },
  {
    index: "02",
    statement: "A live AI voice agent that takes clinic calls and books appointments",
  },
  {
    index: "03",
    statement: "2+ years of building production-ready applications",
  },
];

export function ProofStrip() {
  return (
    <section
      aria-label="Key Facts and Proof Points"
      className="w-full border-y border-border bg-surface/50 py-8 md:py-10"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {PROOF_ITEMS.map((item) => (
            <div
              key={item.index}
              className="flex items-start gap-4 p-4 rounded-[12px] bg-surface border border-border/70 shadow-xs"
            >
              <span className="font-mono text-xs font-semibold text-accent-text dark:text-accent shrink-0 pt-0.5">
                {item.index}
              </span>
              <p className="text-sm font-medium text-text leading-snug">
                {item.statement}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
