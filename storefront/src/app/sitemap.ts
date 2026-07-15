import { MetadataRoute } from "next"
import { getBaseURL } from "@lib/util/env"
import { getProductsList } from "@lib/data/products"

const COUNTRY = (process.env.NEXT_PUBLIC_DEFAULT_REGION || "us").toLowerCase()

export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = await getBaseURL()

  // Static pages every store has
  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "daily", priority: 1 },
    { url: `${base}/store`, changeFrequency: "daily", priority: 0.8 },
  ]

  // This store's products (scoped by domain via the publishable key)
  try {
    let page = 1
    let hasMore = true

    while (hasMore && page <= 50) {
      const { response, nextPage } = await getProductsList({
        pageParam: page,
        queryParams: { limit: 100 },
        countryCode: COUNTRY,
      })

      for (const product of response.products) {
        if (product.handle) {
          entries.push({
            url: `${base}/products/${product.handle}`,
            changeFrequency: "weekly",
            priority: 0.7,
          })
        }
      }

      hasMore = nextPage !== null
      page += 1
    }
  } catch {
    // if products can't be fetched, still return the static entries
  }

  return entries
}
