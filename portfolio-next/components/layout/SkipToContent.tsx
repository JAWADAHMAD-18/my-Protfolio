import React from "react";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-surface focus:text-text focus:border focus:border-border focus:rounded-xl focus:text-sm focus:font-mono focus:shadow-sm transition-all duration-200"
    >
      Skip to content
    </a>
  );
}
