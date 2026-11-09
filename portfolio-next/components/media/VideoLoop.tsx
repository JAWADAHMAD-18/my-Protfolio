"use client";

import * as React from "react";
import Image from "next/image";

interface VideoLoopProps {
  poster: string;
  src?: string;
  webmSrc?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

function usePrefersReducedMotion() {
  return React.useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

export function VideoLoop({
  poster,
  src,
  webmSrc,
  alt = "Project demonstration preview",
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 90vw, 480px",
}: VideoLoopProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const canPlayVideo = Boolean(src) && !prefersReducedMotion;
  const [hasBeenVisible, setHasBeenVisible] = React.useState(false);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    if (!canPlayVideo) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setHasBeenVisible(true);
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [canPlayVideo]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) {
      video.play().catch(() => {
        // Autoplay can be blocked; the poster stays visible.
      });
    } else {
      video.pause();
    }
  }, [inView, hasBeenVisible]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-surface-2 ${className}`}
    >
      <Image
        src={poster}
        alt={alt}
        fill
        priority={priority}
        unoptimized
        sizes={sizes}
        className="object-cover"
      />

      {canPlayVideo && src && hasBeenVisible && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover"
        >
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
