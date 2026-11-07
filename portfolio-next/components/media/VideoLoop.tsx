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
}: VideoLoopProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const canPlayVideo = Boolean(src) && !prefersReducedMotion;

  React.useEffect(() => {
    if (!canPlayVideo) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current) return;
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {
              // Autoplay error catch
            });
          } else {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    const el = containerRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [canPlayVideo]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-surface-2 ${className}`}
    >
      {/* Fallback & Poster image */}
      <Image
        src={poster}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        className={`object-cover transition-opacity duration-300 ${
          canPlayVideo ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Video Loop when video src is provided and reduced motion is false */}
      {canPlayVideo && src && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
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
