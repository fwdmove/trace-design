import type { NextConfig } from 'next'

// Cloudflare Workers Builds sets WORKERS_CI=1; build a static export there.
// Vercel builds are unchanged.
const isCloudflare = process.env.WORKERS_CI === '1' || process.env.STATIC_EXPORT === '1'

const nextConfig: NextConfig = {
  ...(isCloudflare && { output: 'export' }),
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: isCloudflare,
  },
}

export default nextConfig
