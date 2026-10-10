import type { MetadataRoute } from 'next'
import { projects } from '@/content/work'

const base = 'https://www.tracedesign.co'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: 'monthly', priority: 1 },
    ...projects.map((p) => ({ url: `${base}/work/${p.slug}`, changeFrequency: 'yearly' as const, priority: 0.7 })),
  ]
}
