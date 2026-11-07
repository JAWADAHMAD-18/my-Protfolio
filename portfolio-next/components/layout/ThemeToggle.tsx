"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

function useMounted() {
  return React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <button
        type="button"
        className={`w-9 h-9 rounded-[12px] border border-border bg-surface text-muted flex items-center justify-center opacity-70 cursor-pointer ${className}`}
        aria-label="Toggle theme"
        disabled
      >
        <span className="w-4 h-4" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`w-9 h-9 rounded-[12px] border border-border bg-surface text-muted hover:text-text hover:border-accent transition-colors flex items-center justify-center cursor-pointer ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-text transition-transform duration-200" />
      ) : (
        <Moon className="w-4 h-4 text-text transition-transform duration-200" />
      )}
    </button>
  );
}
