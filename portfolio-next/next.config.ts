import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/skills",
        destination: "/about#stack",
        permanent: true,
      },
      {
        source: "/certifications",
        destination: "/about#certifications",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
