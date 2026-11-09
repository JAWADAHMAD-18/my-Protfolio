import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { siteConfig } from "@/data/site";

const ProofStrip = dynamic(() =>
  import("@/components/sections/ProofStrip").then((mod) => mod.ProofStrip)
);
const SelectedWork = dynamic(() =>
  import("@/components/sections/SelectedWork").then((mod) => mod.SelectedWork)
);
const WhatIDo = dynamic(() =>
  import("@/components/sections/WhatIDo").then((mod) => mod.WhatIDo)
);
const Process = dynamic(() =>
  import("@/components/sections/Process").then((mod) => mod.Process)
);
const StackRows = dynamic(() =>
  import("@/components/sections/StackRows").then((mod) => mod.StackRows)
);
const AboutTeaser = dynamic(() =>
  import("@/components/sections/AboutTeaser").then((mod) => mod.AboutTeaser)
);
const FinalCTA = dynamic(() =>
  import("@/components/sections/FinalCTA").then((mod) => mod.FinalCTA)
);

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jawads.vercel.app";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  url: siteUrl,
  image: `${siteUrl}/media/profile/jawad-hero.webp`,
  email: siteConfig.email,
  sameAs: [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.zalvro,
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "React Native",
    "Node.js",
    "Express",
    "Django",
    "TypeScript",
    "Tailwind CSS",
    "AI Systems",
    "Voice Agents",
    "LLM APIs",
  ],
};

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <div className="section-cv">
        <ProofStrip />
      </div>
      <div className="section-cv">
        <SelectedWork />
      </div>
      <div className="section-cv">
        <WhatIDo />
      </div>
      <div className="section-cv">
        <Process />
      </div>
      <div className="section-cv">
        <StackRows />
      </div>
      <div className="section-cv">
        <AboutTeaser />
      </div>
      <div className="section-cv">
        <FinalCTA />
      </div>
    </div>
  );
}
