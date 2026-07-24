import type { MetadataRoute } from 'next'

https://www.hello-med.com/urgent-care
const BASE_URL = 'https://hello-med.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/ann-arbor-meijer`, 
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    }
  ]
}
