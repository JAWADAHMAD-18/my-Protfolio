"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import { useChat } from "@/components/chat/ChatProvider";

function useIsMac() {
  return React.useSyncExternalStore(
    () => () => {},
    () => typeof navigator !== "undefined" && /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent),
    () => false
  );
}

export function AskAiButton({ className = "" }: { className?: string }) {
  const { openChat } = useChat();
  const isMac = useIsMac();

  return (
    <button
      type="button"
      onClick={openChat}
      className={className}
    >
      <Sparkles className="w-3.5 h-3.5 text-accent-text dark:text-accent" aria-hidden="true" />
      <span>Ask my AI</span>
      <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] uppercase text-muted">
        {isMac ? "⌘K" : "Ctrl K"}
      </kbd>
    </button>
  );
}
