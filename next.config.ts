import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["10.0.0.55"],
  images: { unoptimized: true },
};

export default nextConfig;
