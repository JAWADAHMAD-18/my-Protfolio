import * as React from "react";

interface CaseStudySectionProps {
  id?: string;
  badge?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function CaseStudySection({
  id,
  badge,
  title,
  children,
  className = "",
}: CaseStudySectionProps) {
  return (
    <section id={id} className={`py-8 md:py-10 border-b border-border/70 last:border-0 ${className}`}>
      {badge && (
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2 font-semibold">
          {badge}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text mb-6">
        {title}
      </h2>
      <div className="text-text space-y-4 leading-relaxed">
        {children}
      </div>
    </section>
  );
}
