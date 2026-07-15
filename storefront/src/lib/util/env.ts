import { headers } from "next/headers"

export const getBaseURL = async () => {
  try {
    const h = await headers()
    const host = h.get("x-forwarded-host") || h.get("host") || ""
    if (host) {
      const protocol = host.includes("localhost") ? "http" : "https"
      return `${protocol}://${host}`
    }
  } catch {
    // falls through to the env value below
  }
  return process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"
}
