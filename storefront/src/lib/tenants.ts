export type Store = {
  domain: string
  name: string
  publishableKey: string
}

export const DEFAULT_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

export const stores: Store[] = [
  {
    domain: "storefront-production-8e2d.up.railway.app",
    name: "Waterproof Shoes",
    publishableKey: "pk_ff1ae81b16a5762e621135f6e9123614ca3f70dc407242ecb02f269b25ca5f81",
  },
]

function normalize(host: string): string {
  return (host || "").toLowerCase().split(":")[0].replace(/^www\./, "").trim()
}

export function getStoreForHost(host: string): Store {
  const wanted = normalize(host)
  const match = stores.find((store) => normalize(store.domain) === wanted)

  if (match) {
    return match
  }

  return {
    domain: wanted,
    name: "Default",
    publishableKey: DEFAULT_PUBLISHABLE_KEY,
  }
}
