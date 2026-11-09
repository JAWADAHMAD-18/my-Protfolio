import { Hero } from "@/components/sections/Hero";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { Process } from "@/components/sections/Process";
import { StackRows } from "@/components/sections/StackRows";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <Hero />
      <ProofStrip />
      <SelectedWork />
      <WhatIDo />
      <Process />
      <StackRows />
      <AboutTeaser />
      <FinalCTA />
    </div>
  );
}
