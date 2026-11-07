import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectsClientView } from "@/components/projects/ProjectsClientView";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Production web platforms, React Native mobile apps, and conversational AI systems built by Jawad Ahmad.",
};

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-[1200px] mx-auto px-5 py-24 text-center text-muted font-mono text-sm">
          Loading projects...
        </div>
      }
    >
      <ProjectsClientView />
    </Suspense>
  );
}
