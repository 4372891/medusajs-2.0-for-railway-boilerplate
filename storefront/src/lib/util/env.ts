import { headers } from "next/headers"

const FALLBACK =
  process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const getBaseURL = async (): Promise<string> => {
  try {
    const h = await headers()
    const host = h.get("x-forwarded-host") || h.get("host")

    if (host && typeof host === "string") {
      const protocol = host.includes("localhost") ? "http" : "https"
      return `${protocol}://${host}`
    }
  } catch {
    // during build there is no request; fall back
  }

  return FALLBACK
}
