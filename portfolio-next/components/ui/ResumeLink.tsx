import { Download } from "lucide-react";
import { RESUME_URL } from "@/data/site";

interface ResumeLinkProps {
  variant?: "text" | "outline";
}

const variantClasses = {
  text: "text-muted hover:text-accent-text dark:hover:text-accent",
  outline:
    "rounded-full border border-border bg-surface px-5 py-2.5 text-text hover:border-accent hover:text-accent-text dark:hover:text-accent",
};

export function ResumeLink({ variant = "outline" }: ResumeLinkProps) {
  return (
    <a
      href={RESUME_URL}
      download="Jawad-Ahmad-Resume.pdf"
      className={`inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${variantClasses[variant]}`}
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      <span>Resume</span>
    </a>
  );
}
