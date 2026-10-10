import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://www.tracedesign.co', changeFrequency: 'monthly', priority: 1 }]
}
