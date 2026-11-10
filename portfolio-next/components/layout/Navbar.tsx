"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useChat } from "@/components/chat/ChatProvider";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function useIsScrolled() {
  return React.useSyncExternalStore(
    (callback) => {
      window.addEventListener("scroll", callback, { passive: true });
      return () => window.removeEventListener("scroll", callback);
    },
    () => window.scrollY > 16,
    () => false
  );
}

function useIsMac() {
  return React.useSyncExternalStore(
    () => () => {},
    () => typeof navigator !== "undefined" && /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent),
    () => false
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isScrolled = useIsScrolled();
  const isMac = useIsMac();
  const { openChat } = useChat();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/projects") {
      return pathname === "/projects" || pathname.startsWith("/projects/");
    }
    return pathname === href;
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-surface/95 md:bg-surface/85 md:backdrop-blur-md border-b border-border py-3"
          : "bg-transparent border-b border-transparent py-4"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 flex items-center justify-between">
        {/* Logo (ThemeToggle is NOT inside this link) */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-text hover:opacity-90 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md py-1"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
            aria-hidden="true"
          >
            <rect
              width="28"
              height="28"
              rx="6"
              className="fill-surface-2 stroke-border"
              strokeWidth="1"
            />
            <text
              x="50%"
              y="54%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-text font-mono text-[11px] font-semibold tracking-wider"
            >
              JA
            </text>
          </svg>
          <span className="font-sans font-semibold text-[15px] tracking-tight text-text">
            Jawad Ahmad
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          className="hidden md:flex items-center gap-1 bg-surface-2/60 border border-border px-3 py-1.5 rounded-full"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1 text-sm rounded-full transition-colors relative ${
                  active
                    ? "text-accent-text dark:text-accent font-medium bg-surface shadow-xs"
                    : "text-muted hover:text-text"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Ask AI button */}
          <button
            type="button"
            onClick={openChat}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface text-xs font-mono text-muted hover:text-text hover:border-accent transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent-text dark:text-accent" />
            <span>Ask AI</span>
            <kbd className="px-1.5 py-0.5 rounded bg-surface-2 border border-border text-[10px] uppercase text-muted">
              {isMac ? "⌘K" : "Ctrl K"}
            </kbd>
          </button>

          {/* ThemeToggle */}
          <ThemeToggle />

          {/* Let's talk primary CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center text-sm font-medium px-4 py-2 rounded-full bg-accent text-on-accent hover:bg-accent-2 transition-colors shadow-xs"
          >
            Let&apos;s talk
          </Link>
        </div>

        {/* Mobile Actions & Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="w-9 h-9 rounded-[12px] border border-border bg-surface text-text flex items-center justify-center cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[57px] z-50 bg-bg border-t border-border flex flex-col justify-between p-6 md:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-3 pt-4">
            <p className="font-mono text-xs uppercase tracking-wider text-muted px-2">Navigation</p>
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-semibold px-2 py-2 rounded-[12px] transition-colors ${
                    active
                      ? "text-accent-text dark:text-accent bg-surface-2"
                      : "text-text hover:text-accent-text dark:hover:text-accent"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 pb-8 border-t border-border pt-6">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openChat();
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-[12px] border border-border bg-surface text-sm font-mono text-muted cursor-pointer hover:border-accent"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent-text dark:text-accent" />
                Ask AI Assistant
              </span>
              <kbd className="px-2 py-0.5 rounded bg-surface-2 border border-border text-xs">
                {isMac ? "⌘K" : "Ctrl K"}
              </kbd>
            </button>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-full bg-accent text-on-accent hover:bg-accent-2 font-medium text-base transition-colors"
            >
              Let&apos;s talk
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
