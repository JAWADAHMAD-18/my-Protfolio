import React from "react";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";

interface SocialLink {
  label: string;
  href: string;
  icon: (props: { className?: string }) => React.JSX.Element;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/JAWADAHMAD-18",
    icon: ({ className }) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jawad-tech/",
    icon: ({ className }) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/923037741461",
    icon: ({ className }) => <MessageCircle className={className} aria-hidden="true" />,
  },
  {
    label: "Email",
    href: "mailto:jawadahmad5618@gmail.com",
    icon: ({ className }) => <Mail className={className} aria-hidden="true" />,
  },
];

const FOOTER_NAV = [
  { label: "Work", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-surface mt-auto py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-border/60">
          <div className="flex flex-col gap-1.5">
            <Link
              href="/"
              className="text-base font-semibold tracking-tight text-text hover:text-accent-text dark:hover:text-accent transition-colors"
            >
              Jawad Ahmad
            </Link>
            <p className="text-sm text-muted">
              Full-stack & AI application engineer.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-6" aria-label="Footer Navigation">
            {FOOTER_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted hover:text-text transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-[12px] border border-border bg-surface-2/40 text-muted hover:text-text hover:border-accent transition-colors flex items-center justify-center cursor-pointer"
                aria-label={item.label}
              >
                <item.icon className="w-4 h-4 text-currentColor" />
              </a>
            ))}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted">
          <p>© 2026 Jawad Ahmad. All rights reserved.</p>
          <p className="tracking-wide uppercase">Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
