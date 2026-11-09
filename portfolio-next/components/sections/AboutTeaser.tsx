import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";

export function AboutTeaser() {
  return (
    <section aria-label="About teaser" className="w-full py-16 md:py-24 border-t border-border">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* About Teaser */}
          <div className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2 font-semibold">
              About
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-text mb-6">
              A bit about me.
            </h2>
            <p className="text-base sm:text-lg text-text leading-relaxed max-w-[65ch] mb-6">
              I&apos;m a full-stack developer with a BS in Computer Science and
              2+ years of hands-on building. I like taking a product from a
              rough idea to something people can actually use, on web, mobile
              and with AI where it helps.
            </p>
            <Link
              href="/about"
              className="group inline-flex items-center gap-1.5 font-mono text-sm text-muted hover:text-accent-text dark:hover:text-accent transition-colors"
            >
              <span>More about me</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Zalvro Line */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-[16px] bg-surface-2/60 border border-border/80">
            <p className="text-sm text-text leading-relaxed mb-4">
              For teams and businesses, I also work through{" "}
              <strong className="font-semibold text-text">Zalvro</strong>, my AI
              automation and web development studio.
            </p>
            <a
              href={siteConfig.links.zalvro}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-text dark:text-accent hover:underline"
            >
              <span>zalvrohq.com</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
