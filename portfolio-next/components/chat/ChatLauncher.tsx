"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import { useChat } from "@/components/chat/ChatProvider";

export function ChatLauncher() {
  const { isOpen, openChat } = useChat();
  const launcherRef = React.useRef<HTMLDivElement>(null);
  const [overlapsFooter, setOverlapsFooter] = React.useState(false);

  React.useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const updateFooterOverlap = () => {
      const launcher = launcherRef.current?.getBoundingClientRect();
      const footerBounds = footer.getBoundingClientRect();
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      setOverlapsFooter(
        isMobile &&
          Boolean(
            launcher &&
              footerBounds.top < launcher.bottom &&
              footerBounds.bottom > launcher.top
          )
      );
    };

    updateFooterOverlap();
    window.addEventListener("scroll", updateFooterOverlap, { passive: true });
    window.addEventListener("resize", updateFooterOverlap);

    return () => {
      window.removeEventListener("scroll", updateFooterOverlap);
      window.removeEventListener("resize", updateFooterOverlap);
    };
  }, []);

  return (
    <div
      ref={launcherRef}
      className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 z-40 h-12 w-12"
    >
      {!overlapsFooter && (
        <button
          type="button"
          onClick={openChat}
          disabled={isOpen}
          aria-hidden={isOpen}
          tabIndex={isOpen ? -1 : 0}
          aria-label="Open Jawad's AI Assistant"
          className={`flex h-full min-h-11 w-full min-w-11 items-center justify-center rounded-full bg-accent text-on-accent shadow-xs transition-colors hover:bg-accent-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
            isOpen ? "invisible pointer-events-none" : ""
          }`}
        >
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
