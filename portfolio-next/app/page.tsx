import { Hero } from "@/components/sections/Hero";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { SelectedWork } from "@/components/sections/SelectedWork";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <Hero />
      <ProofStrip />
      <SelectedWork />
    </div>
  );
}
