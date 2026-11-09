import type { Metadata } from "next";
import { Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { TechIcon } from "@/components/ui/TechIcon";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Jawad Ahmad for full-stack web development, React Native mobile apps, or AI systems engineering.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Jawad Ahmad",
    description:
      "Get in touch with Jawad Ahmad for full-stack web development, React Native mobile apps, or AI systems engineering.",
    url: "/contact",
  },
};

const DIRECT_LINKS = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    note: "Direct inbox",
    icon: Mail,
  },
  {
    label: "WhatsApp",
    value: siteConfig.whatsapp.display,
    href: siteConfig.whatsapp.url,
    note: "Quick chats and audio notes",
    icon: MessageCircle,
  },
  {
    label: "GitHub",
    value: "JAWADAHMAD-18",
    href: siteConfig.links.github,
    note: "Open source and code samples",
    icon: ({ className }: { className?: string }) => (
      <TechIcon name="github" size={18} className={className} />
    ),
  },
  {
    label: "LinkedIn",
    value: "jawad-tech",
    href: siteConfig.links.linkedin,
    note: "Professional background",
    icon: ({ className }: { className?: string }) => (
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
];

export default function ContactPage() {
  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2 font-semibold">
            Contact
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-tight text-text mb-4">
            Let&apos;s talk.
          </h1>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            Tell me about your project or idea. I read every message and reply with honest next steps.
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Direct Contact Options */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-mono text-xs uppercase tracking-wider text-muted font-semibold mb-4">
              Direct Communication
            </h2>

            <div className="space-y-3">
              {DIRECT_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group p-4 rounded-[16px] border border-border bg-surface hover:border-accent flex items-center justify-between transition-colors shadow-2xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-[12px] bg-surface-2 border border-border flex items-center justify-center text-text shrink-0">
                      <item.icon className="w-5 h-5 text-current" />
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-text group-hover:text-accent-text dark:group-hover:text-accent transition-colors">
                        {item.label}
                      </span>
                      <span className="block font-mono text-xs text-muted">
                        {item.value}
                      </span>
                    </div>
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent-text dark:group-hover:text-accent transition-colors" />
                </a>
              ))}
            </div>

            <div className="p-5 rounded-[16px] bg-surface-2/60 border border-border/80 text-xs text-muted leading-relaxed mt-6">
              <p className="font-semibold text-text mb-1">Looking for a studio or team engagement?</p>
              <p>
                For larger agency-style projects or enterprise automations, I also operate via{" "}
                <a
                  href={siteConfig.links.zalvro}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-text dark:text-accent underline font-medium"
                >
                  Zalvro
                </a>
                .
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
