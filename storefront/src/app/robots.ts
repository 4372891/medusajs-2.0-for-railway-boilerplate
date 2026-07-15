import { MetadataRoute } from "next"
import { getBaseURL } from "@lib/util/env"

export const dynamic = "force-dynamic"

export default async function robots(): Promise<MetadataRoute.Robots> {
  const base = await getBaseURL()

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/account", "/cart"],
    },
    sitemap: `${base}/sitemap.xml`,
  }
}
