import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services, processSteps } from "@/data/services";
import { siteConfig } from "@/data/site";
import { TechIcon } from "@/components/ui/TechIcon";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web, mobile and AI engineering handled by one engineer from start to finish. Full-stack web, React Native apps, and conversational AI systems.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Jawad Ahmad",
    description:
      "Web, mobile and AI engineering handled by one engineer from start to finish.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2 font-semibold">
            Capabilities & Services
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-tight text-text mb-4">
            What I build.
          </h1>
          <p className="text-muted text-base sm:text-lg leading-relaxed max-w-[65ch]">
            Web, mobile and AI, handled by one engineer from start to finish. No handoffs between separate contractors.
          </p>
        </div>

        {/* 3 Capabilities Sections */}
        <div className="space-y-12 md:space-y-16 mb-20 md:mb-28">
          {services.map((service) => (
            <section
              key={service.number}
              className="rounded-[20px] border border-border bg-surface p-6 sm:p-8 md:p-12 shadow-xs transition-colors hover:border-accent"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Number & Main Info */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-2 border border-border text-accent-text dark:text-accent">
                      {service.number}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-base sm:text-lg text-text font-medium leading-relaxed">
                    {service.short}
                  </p>

                  <div className="pt-2">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-muted mb-2 font-semibold">
                      What You Get
                    </h3>
                    <p className="text-sm sm:text-base text-muted leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-sm text-muted">
                    <span className="font-mono text-xs uppercase tracking-wider text-muted font-semibold">
                      Example:
                    </span>
                    <span className="text-text font-medium">{service.example}</span>
                  </div>

                  <div className="pt-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-on-accent hover:bg-accent-2 font-medium text-sm transition-colors shadow-xs"
                    >
                      <span>{service.cta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right: Technology Stack */}
                <div className="lg:col-span-5 bg-surface-2/50 border border-border/80 rounded-[16px] p-6 space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-muted font-semibold">
                    Core Technologies
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {service.stack.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-2 p-2 rounded-[8px] bg-surface border border-border text-xs font-mono text-text"
                      >
                        <TechIcon name={tech} size={15} />
                        <span className="truncate">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Process Section */}
        <div className="border-t border-border pt-16 md:pt-20 mb-20 md:mb-28">
          <div className="max-w-2xl mb-12">
            <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2 font-semibold">
              Methodology
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-text mb-3">
              How I work.
            </h2>
            <p className="text-muted text-base leading-relaxed">
              Transparent, iterative delivery with working software at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-[16px] border border-border bg-surface flex flex-col justify-between"
              >
                <div>
                  <span className="block font-mono text-xs font-bold text-accent-text dark:text-accent mb-3">
                    {step.step}
                  </span>
                  <h3 className="text-lg font-semibold text-text mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teams & Businesses Callout */}
        <div className="p-8 sm:p-10 rounded-[20px] bg-surface-2/70 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-xl font-semibold text-text mb-2">
              Need a team engagement or a longer project?
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              For larger scale initiatives, ongoing maintenance, or multi-role development, I also operate through{" "}
              <strong className="text-text font-semibold">Zalvro</strong>, my AI automation and web studio.
            </p>
          </div>

          <a
            href={siteConfig.links.zalvro}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-surface text-text hover:border-accent font-medium text-sm transition-colors shrink-0"
          >
            <span>Visit Zalvro</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
