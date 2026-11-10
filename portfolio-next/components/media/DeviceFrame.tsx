import * as React from "react";

interface DeviceFrameProps {
  type: "browser" | "phone";
  children: React.ReactNode;
  url?: string;
  title?: string;
  className?: string;
}

export function DeviceFrame({
  type,
  children,
  url = "tripfusion.vercel.app",
  title = "TripFusion",
  className = "",
}: DeviceFrameProps) {
  if (type === "phone") {
    return (
      <div
        className={`relative rounded-[32px] border-2 border-border bg-surface p-2 shadow-sm ${className}`}
        role="group"
        aria-label={`${title} mobile preview`}
      >
        {/* Phone Dynamic Island / Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-16 h-3.5 bg-border/90 rounded-full flex items-center justify-end pr-2">
          <div className="w-1.5 h-1.5 rounded-full bg-surface/80" />
        </div>

        {/* Phone Screen Container */}
        <div className="relative w-full aspect-[9/18.5] overflow-hidden rounded-[24px] bg-surface-2 border border-border/50">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-[12px] border border-border bg-surface overflow-hidden shadow-sm ${className}`}
      role="group"
      aria-label={`${title} browser preview`}
    >
      {/* Browser Chrome Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-border bg-surface-2/70 select-none">
        {/* Window Controls */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-border" />
          <span className="w-2.5 h-2.5 rounded-full bg-border" />
          <span className="w-2.5 h-2.5 rounded-full bg-border" />
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-[240px] sm:max-w-[320px] mx-auto px-3 py-1 rounded-md bg-surface border border-border/70 text-center">
          <span className="font-mono text-[11px] text-muted truncate block">
            {url}
          </span>
        </div>

        <div className="w-8" aria-hidden="true" />
      </div>

      {/* Browser Viewport */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-2">
        {children}
      </div>
    </div>
  );
}
