import catalog from '@/docs/catalog.json';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return [];
  const origin = siteUrl.replace(/\/$/, '');
  return [
    { url: origin, changeFrequency: 'monthly', priority: 1 },
    ...catalog.map((page) => ({
      url: origin + page.path,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
