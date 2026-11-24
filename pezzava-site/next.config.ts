import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow external Cloudflare tunnel domains during development
  allowedDevOrigins: [
    "*.trycloudflare.com",
    "trycloudflare.com",
  ],
};

export default nextConfig;
