import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "t4.ftcdn.net",
      },
    ],
  },
};

export default nextConfig;
