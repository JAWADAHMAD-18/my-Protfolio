import Link from "next/link";
import Image from "next/image";
import { preload } from "react-dom";
import { ArrowUpRight } from "lucide-react";
import { AskAiButton } from "@/components/chat/AskAiButton";

const HERO_PHOTO = "/media/profile/jawad-hero.webp";
const HERO_WIDTH = 427;
const HERO_HEIGHT = 585;

export function Hero() {
  preload(HERO_PHOTO, { as: "image", fetchPriority: "high" });

  return (
    <section className="relative w-full overflow-hidden pt-6 pb-12 md:pt-16 md:pb-20">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-xs font-mono uppercase tracking-wider text-muted mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Available for work</span>
            </div>

            <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-muted mb-2.5 font-semibold">
              Jawad Ahmad
            </p>

            <h1 className="text-[32px] sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.08] text-text mb-5 max-w-xl">
              Full-stack & AI{" "}
              <span className="font-serif italic font-normal text-accent-text dark:text-accent">
                application
              </span>{" "}
              engineer.
            </h1>

            <p className="text-base sm:text-lg text-muted max-w-[65ch] leading-relaxed mb-6">
              Turning ideas into scalable, impactful products. Web, mobile and AI, built end to end.
            </p>

            <p className="font-mono text-xs sm:text-sm text-muted mb-8 tracking-wide">
              React · Next.js · React Native · Node.js · Django · LLM APIs
            </p>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-accent text-on-accent hover:bg-accent-2 font-medium text-sm transition-colors shadow-xs"
              >
                <span>View my work</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-border bg-surface text-text hover:border-accent font-medium text-sm transition-colors shadow-xs"
              >
                Let&apos;s talk
              </Link>

              <AskAiButton className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-surface-2/60 text-muted hover:text-text hover:border-accent text-sm font-mono transition-colors cursor-pointer" />
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[220px] sm:max-w-[300px] lg:max-w-[380px]">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[32px] border border-accent/35 shadow-[0_0_0_6px_rgba(72,208,168,0.12)]"
              />
              <div className="relative overflow-hidden rounded-[28px] bg-[#121415] ring-1 ring-accent/40">
                <Image
                  src={HERO_PHOTO}
                  alt="Jawad Ahmad, full-stack and AI engineer"
                  width={HERO_WIDTH}
                  height={HERO_HEIGHT}
                  priority
                  fetchPriority="high"
                  decoding="sync"
                  unoptimized
                  sizes="(max-width: 640px) 220px, (max-width: 1024px) 300px, 380px"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
