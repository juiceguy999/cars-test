import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://ru-msk-dr3-1.store.cloud.mts.ru/**'),
      new URL('https://app.plex-crm.ru/**')
    ]
  },
  /* config options here */
};

export default nextConfig;
