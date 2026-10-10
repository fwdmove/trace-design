import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'www.tracedesign.co', pathname: '/website-screenshots/**' }],
  },
}

export default nextConfig
