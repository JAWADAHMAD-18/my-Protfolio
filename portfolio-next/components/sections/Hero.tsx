"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { DeviceFrame } from "@/components/media/DeviceFrame";
import { VideoLoop } from "@/components/media/VideoLoop";

function useIsMac() {
  return React.useSyncExternalStore(
    () => () => {},
    () => typeof navigator !== "undefined" && /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent),
    () => false
  );
}

export function Hero() {
  const isMac = useIsMac();

  return (
    <section className="relative w-full overflow-hidden pt-8 pb-14 md:pt-16 md:pb-20">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-xs font-mono uppercase tracking-wider text-muted mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Available for work</span>
            </div>

            {/* Name Line in Mono */}
            <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-muted mb-2.5 font-semibold">
              Jawad Ahmad
            </p>

            {/* H1 Heading */}
            <h1 className="text-[32px] sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.08] text-text mb-5 max-w-xl">
              Full-stack & AI{" "}
              <span className="font-serif italic font-normal text-accent-text dark:text-accent">
                application
              </span>{" "}
              engineer.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-muted max-w-[65ch] leading-relaxed mb-6">
              Turning ideas into scalable, impactful products. Web, mobile and AI, built end to end.
            </p>

            {/* Tech Line in Mono */}
            <p className="font-mono text-xs sm:text-sm text-muted mb-8 tracking-wide">
              React · Next.js · React Native · Node.js · Django · LLM APIs
            </p>

            {/* 3 Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* Primary CTA */}
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-accent text-on-accent hover:bg-accent-2 font-medium text-sm transition-colors shadow-xs"
              >
                <span>View my work</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-border bg-surface text-text hover:border-accent font-medium text-sm transition-colors shadow-xs"
              >
                Let&apos;s talk
              </Link>

              {/* Ask AI Input-style Button */}
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-surface-2/60 text-muted hover:text-text hover:border-accent text-sm font-mono transition-colors cursor-pointer"
                aria-label="Ask my AI assistant (Ctrl K)"
              >
                <Sparkles className="w-3.5 h-3.5 text-accent-text dark:text-accent" />
                <span>Ask my AI</span>
                <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] uppercase text-muted">
                  {isMac ? "⌘K" : "Ctrl K"}
                </kbd>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Real Project Visual (Browser + Phone mockups) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative w-full pt-2 pb-6 sm:pb-0"
          >
            <div className="relative mx-auto max-w-[340px] sm:max-w-[420px] lg:max-w-none pr-8 sm:pr-10 lg:pr-12">
              {/* Background Browser Mockup */}
              <DeviceFrame
                type="browser"
                url="tripfusion.vercel.app"
                title="TripFusion Web Platform"
                className="w-full shadow-md"
              >
                <VideoLoop
                  poster="/media/placeholder/tripfusion-browser.png"
                  alt="TripFusion travel platform browser mockup"
                  priority
                />
              </DeviceFrame>

              {/* Foreground Mobile Phone Mockup */}
              <div className="absolute -bottom-4 right-0 sm:-right-2 w-[110px] sm:w-[145px] md:w-[160px] z-10 drop-shadow-xl">
                <DeviceFrame
                  type="phone"
                  title="TripFusion Mobile App"
                  className="w-full border-border bg-surface shadow-lg"
                >
                  <VideoLoop
                    poster="/media/placeholder/tripfusion-phone.png"
                    alt="TripFusion companion mobile app mockup"
                    priority
                  />
                </DeviceFrame>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
