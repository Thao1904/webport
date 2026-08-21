import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["encrypted-tbn0.gstatic.com", "cdn.pixabay.com"], // thêm domain ở đây
  },
};

export default nextConfig;