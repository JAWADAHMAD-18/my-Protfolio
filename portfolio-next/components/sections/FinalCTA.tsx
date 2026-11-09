import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section aria-label="Contact call to action" className="w-full py-16 md:py-24 border-t border-border">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="p-8 sm:p-12 md:p-16 rounded-[20px] border border-border bg-surface text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-text mb-4 max-w-xl mx-auto">
            Got an idea or a product that needs building?
          </h2>
          <p className="text-base sm:text-lg text-muted max-w-md mx-auto mb-8 leading-relaxed">
            Tell me what you&apos;re working on. I&apos;ll reply with honest
            next steps.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-on-accent hover:bg-accent-2 font-medium text-sm transition-colors shadow-xs"
          >
            <span>Let&apos;s talk</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
