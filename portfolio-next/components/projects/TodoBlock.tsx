import * as React from "react";

interface TodoBlockProps {
  label?: "[FILL]" | "[CONFIRM]" | string;
  children: React.ReactNode;
  className?: string;
}

export function TodoBlock({
  label = "[FILL]",
  children,
  className = "",
}: TodoBlockProps) {
  // Hide in production builds per specification
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div
      className={`my-3 p-3 rounded-xl border border-dashed border-border bg-surface-2/70 text-xs font-mono text-muted flex items-start gap-2.5 ${className}`}
      role="note"
      aria-label="Development TODO"
    >
      <span className="font-semibold text-accent-text dark:text-accent shrink-0">
        {label}
      </span>
      <div className="flex-1 leading-relaxed">{children}</div>
    </div>
  );
}
