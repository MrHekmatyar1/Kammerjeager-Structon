import type { MetadataRoute } from 'next'
import { CITIES, BERLIN_BEZIRKE, GERMAN_CITIES } from '@/lib/data/cities'
import { SERVICES } from '@/lib/data/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kammerjaeger-structon.de'

  // ── Главные статические страницы ──────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/geschaeftskunden`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fuer-schaedlingsbekaempfer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ueber-uns`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/agb`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // ── Alle deutschen Großstädte (Hamburg, München, Köln, etc.) ──────────────
  // Priorität 0.85 — wichtige lokale SEO-Seiten
  const cityPages: MetadataRoute.Sitemap = GERMAN_CITIES.map(city => ({
    url: `${baseUrl}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // ── Berlin Bezirke (Übersichtsseiten) ─────────────────────────────────────
  // Priorität 0.9 — wichtigste lokale SEO-Seiten
  const bezirkPages: MetadataRoute.Sitemap = BERLIN_BEZIRKE.map(city => ({
    url: `${baseUrl}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // ── Berlin Bezirk × Service (96 Seiten) ──────────────────────────────────
  // Priorität 0.85 — Long-tail Zielseiten
  const bezirkServicePages: MetadataRoute.Sitemap = BERLIN_BEZIRKE.flatMap(city =>
    SERVICES.map(service => ({
      url: `${baseUrl}/${city.slug}/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    }))
  )

  // ── Geschäftskunden-Unterseiten ───────────────────────────────────────────
  const branches = ['gastronomie', 'hotellerie', 'lager', 'oeffentlich']
  const branchPages: MetadataRoute.Sitemap = branches.map((branch) => ({
    url: `${baseUrl}/geschaeftskunden/${branch}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // ── Schädlingsarten-Seiten ────────────────────────────────────────────────
  const serviceLandingPages: MetadataRoute.Sitemap = SERVICES.map(service => ({
    url: `${baseUrl}/schaedlinge/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [
    ...staticPages,
    ...cityPages,
    ...bezirkPages,
    ...bezirkServicePages,
    ...branchPages,
    ...serviceLandingPages,
  ]
}
