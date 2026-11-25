import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // The page lived at /who-we-help/corporates-compliance while its canonical, sitemap entry and most links used
  // /corporations-compliance (a 404). The folder now matches; keep the old address working.
  async redirects() {
    return [
      { source: "/who-we-help/corporates-compliance", destination: "/who-we-help/corporations-compliance", permanent: true },
    ];
  },
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Largest generated width is 1920px (the default goes to 3840px, which produced 300–700 KB photos).
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
