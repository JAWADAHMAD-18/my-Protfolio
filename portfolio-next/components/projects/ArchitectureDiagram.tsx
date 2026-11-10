import * as React from "react";
import { TodoBlock } from "./TodoBlock";

interface ArchitectureDiagramProps {
  projectSlug: string;
  className?: string;
}

export function ArchitectureDiagram({
  projectSlug,
  className = "",
}: ArchitectureDiagramProps) {
  if (projectSlug === "tripfusion") {
    return (
      <div className={`w-full rounded-xl border border-border bg-surface p-6 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs uppercase tracking-wider text-muted font-semibold">
            System Architecture
          </span>
          {process.env.NODE_ENV !== "production" && (
            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface-2 text-muted border border-border">
              [CONFIRM: architecture details]
            </span>
          )}
        </div>

        {/* Theme-Aware Inline SVG Diagram for TripFusion */}
        <div
          className="w-full overflow-x-auto py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          tabIndex={0}
          role="region"
          aria-label="Scroll horizontally to view the architecture diagram"
        >
          <svg
            viewBox="0 0 760 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full min-w-[640px] h-auto select-none font-sans"
            role="img"
            aria-label="TripFusion System Architecture Diagram"
          >
            {/* Defs for arrow markers */}
            <defs>
              <marker
                id="arrow-tf"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--muted)" />
              </marker>
              <marker
                id="arrow-accent-tf"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--accent)" />
              </marker>
            </defs>

            {/* Column 1: Clients */}
            <rect x="20" y="30" width="160" height="85" rx="10" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="100" y="65" textAnchor="middle" fill="var(--text)" fontSize="13" fontWeight="600">Web App</text>
            <text x="100" y="85" textAnchor="middle" fill="var(--muted)" fontSize="11" fontFamily="var(--font-geist-mono)">React · Tailwind · JWT</text>

            <rect x="20" y="145" width="160" height="85" rx="10" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="100" y="180" textAnchor="middle" fill="var(--text)" fontSize="13" fontWeight="600">Mobile App</text>
            <text x="100" y="200" textAnchor="middle" fill="var(--muted)" fontSize="11" fontFamily="var(--font-geist-mono)">React Native · Expo</text>

            {/* Connecting Arrows to API */}
            <path d="M 180 72.5 L 290 120" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrow-tf)" />
            <path d="M 180 187.5 L 290 140" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrow-tf)" />

            {/* Column 2: Backend API */}
            <rect x="300" y="65" width="180" height="130" rx="12" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2" />
            <text x="390" y="100" textAnchor="middle" fill="var(--text)" fontSize="14" fontWeight="600">Backend Core</text>
            <text x="390" y="125" textAnchor="middle" fill="var(--muted)" fontSize="12" fontFamily="var(--font-geist-mono)">Node.js · Express</text>
            <text x="390" y="145" textAnchor="middle" fill="var(--muted)" fontSize="11">Auth & Caching Layer</text>
            <text x="390" y="165" textAnchor="middle" fill="var(--accent-text)" fontSize="11" fontWeight="500">Socket.io (Live Chat)</text>

            {/* Connecting Arrows to Data & AI */}
            <path d="M 480 100 L 570 65" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrow-tf)" />
            <path d="M 480 130 L 570 130" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrow-tf)" />
            <path d="M 480 160 L 570 195" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow-accent-tf)" />

            {/* Column 3: Data Stores & AI */}
            <rect x="580" y="25" width="160" height="70" rx="10" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="660" y="55" textAnchor="middle" fill="var(--text)" fontSize="13" fontWeight="600">MongoDB</text>
            <text x="660" y="75" textAnchor="middle" fill="var(--muted)" fontSize="11">Travel Data</text>

            <rect x="580" y="105" width="160" height="55" rx="10" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="660" y="132" textAnchor="middle" fill="var(--text)" fontSize="13" fontWeight="600">Redis Cache</text>
            <text x="660" y="148" textAnchor="middle" fill="var(--muted)" fontSize="10">Cache</text>

            <rect x="580" y="170" width="160" height="65" rx="10" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="660" y="198" textAnchor="middle" fill="var(--text)" fontSize="13" fontWeight="600">Rule-based Bot API</text>
            <text x="660" y="218" textAnchor="middle" fill="var(--muted)" fontSize="10">Rule-based Package API</text>
          </svg>
        </div>

        <TodoBlock label="[CONFIRM]">
          TripFusion architecture details: verification needed for Redis caching deployment and rule-based bot endpoint structure.
        </TodoBlock>
      </div>
    );
  }

  if (projectSlug === "ahmed-ai-voice-receptionist") {
    return (
      <div className={`w-full rounded-xl border border-border bg-surface p-6 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs uppercase tracking-wider text-muted font-semibold">
            Voice Agent Pipeline
          </span>
          {process.env.NODE_ENV !== "production" && (
            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface-2 text-muted border border-border">
              [CONFIRM: actual pipeline flow]
            </span>
          )}
        </div>

        {/* Theme-Aware Inline SVG Diagram for Ahmed */}
        <div
          className="w-full overflow-x-auto py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          tabIndex={0}
          role="region"
          aria-label="Scroll horizontally to view the voice agent pipeline"
        >
          <svg
            viewBox="0 0 760 210"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full min-w-[640px] h-auto select-none font-sans"
            role="img"
            aria-label="Ahmed AI Voice Receptionist Flow Diagram"
          >
            <defs>
              <marker
                id="arrow-ahmed"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--muted)" />
              </marker>
              <marker
                id="arrow-accent-ahmed"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--accent)" />
              </marker>
            </defs>

            {/* Step 1: Caller */}
            <rect x="20" y="55" width="120" height="95" rx="10" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="80" y="95" textAnchor="middle" fill="var(--text)" fontSize="13" fontWeight="600">Inbound Caller</text>
            <text x="80" y="118" textAnchor="middle" fill="var(--muted)" fontSize="11">Patient Call</text>

            <path d="M 140 102.5 L 180 102.5" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrow-ahmed)" />

            {/* Step 2: VAPI + ElevenLabs */}
            <rect x="190" y="45" width="160" height="115" rx="12" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="270" y="80" textAnchor="middle" fill="var(--text)" fontSize="14" fontWeight="600">VAPI Telephony</text>
            <text x="270" y="105" textAnchor="middle" fill="var(--muted)" fontSize="11">Real-time Audio Stream</text>
            <text x="270" y="125" textAnchor="middle" fill="var(--accent-text)" fontSize="11" fontWeight="500">ElevenLabs Voice</text>

            <path d="M 350 102.5 L 390 102.5" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow-accent-ahmed)" />

            {/* Step 3: n8n Workflow */}
            <rect x="400" y="50" width="150" height="105" rx="10" fill="var(--surface-2)" stroke="var(--accent)" strokeWidth="1.5" />
            <text x="475" y="85" textAnchor="middle" fill="var(--text)" fontSize="13" fontWeight="600">n8n Automation</text>
            <text x="475" y="108" textAnchor="middle" fill="var(--muted)" fontSize="11">Webhook Router</text>
            <text x="475" y="128" textAnchor="middle" fill="var(--muted)" fontSize="10">State & Flow Logic</text>

            <path d="M 550 102.5 L 590 102.5" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrow-ahmed)" />

            {/* Step 4: Groq & Calendar */}
            <rect x="600" y="30" width="140" height="65" rx="10" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="670" y="58" textAnchor="middle" fill="var(--text)" fontSize="12" fontWeight="600">Groq LLM</text>
            <text x="670" y="78" textAnchor="middle" fill="var(--muted)" fontSize="10">Intent & Extraction</text>

            <rect x="600" y="110" width="140" height="65" rx="10" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="670" y="138" textAnchor="middle" fill="var(--text)" fontSize="12" fontWeight="600">Clinic Calendar</text>
            <text x="670" y="158" textAnchor="middle" fill="var(--muted)" fontSize="10">Appointment Booking</text>
          </svg>
        </div>

        <TodoBlock label="[CONFIRM]">
          Ahmed voice receptionist pipeline: confirm CRM/Google Calendar webhook endpoint and fallback transfer flow.
        </TodoBlock>
      </div>
    );
  }

  // Generic flow for other projects
  return (
    <div className={`w-full rounded-xl border border-border bg-surface p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs uppercase tracking-wider text-muted font-semibold">
          Architecture Flow
        </span>
        <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface-2 text-muted border border-border">
          [CONFIRM: diagram]
        </span>
      </div>
      <TodoBlock label="[FILL]">
        Architecture diagram for {projectSlug} will be rendered once flow parameters are confirmed.
      </TodoBlock>
    </div>
  );
}
