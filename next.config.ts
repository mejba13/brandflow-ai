import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: "standalone",

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.clerk.com",
      },
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
      },
    ],
  },

  // Experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
