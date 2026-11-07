import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
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
