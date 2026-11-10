import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AskAiButton } from "@/components/chat/AskAiButton";

const HERO_PHOTO = "/media/profile/jawad-hero.webp";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden py-8 md:py-12 lg:py-14">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] items-center gap-8 md:gap-10">
          <div className="order-2 md:order-1 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-xs font-mono uppercase tracking-wider text-muted mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Available for work</span>
            </div>

            <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-muted mb-2.5 font-semibold">
              Jawad Ahmad
            </p>

            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-[-0.03em] leading-[1.05] text-text mb-5 max-w-xl">
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

          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative aspect-[4/5] w-[120px] sm:w-[150px] md:w-full md:max-w-[420px] md:max-h-[min(70svh,520px)] overflow-hidden rounded-xl border border-border bg-surface">
                <Image
                  src={HERO_PHOTO}
                  alt="Jawad Ahmad, full-stack and AI engineer"
                  width={447}
                  height={558}
                  priority
                  fetchPriority="high"
                  sizes="(min-width: 1200px) 406px, (min-width: 768px) calc((100vw - 104px) * 0.37037), (min-width: 640px) 150px, 120px"
                  className="absolute inset-0 h-full w-full object-cover object-[center_15%]"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
