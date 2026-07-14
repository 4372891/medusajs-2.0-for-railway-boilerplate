import Medusa from "@medusajs/js-sdk"
import { headers } from "next/headers"
import { DEFAULT_PUBLISHABLE_KEY, getStoreForHost, Store } from "./tenants"

let MEDUSA_BACKEND_URL = "http://localhost:9000"

if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
}

const clients = new Map<string, Medusa>()

function clientFor(publishableKey: string): Medusa {
  const existing = clients.get(publishableKey)

  if (existing) {
    return existing
  }

  const client = new Medusa({
    baseUrl: MEDUSA_BACKEND_URL,
    debug: process.env.NODE_ENV === "development",
    publishableKey,
  })

  clients.set(publishableKey, client)

  return client
}

export async function getCurrentHost(): Promise<string> {
  try {
    const requestHeaders = await headers()
    return (
      requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || ""
    )
  } catch (e) {
    return ""
  }
}

export async function getCurrentStore(): Promise<Store> {
  return getStoreForHost(await getCurrentHost())
}

async function currentClient(): Promise<Medusa> {
  const store = await getCurrentStore()
  return clientFor(store.publishableKey || DEFAULT_PUBLISHABLE_KEY)
}

function makeSdkProxy(path: string[]): any {
  const target = function () {} as any

  return new Proxy(target, {
    get(_target, property) {
      if (typeof property !== "string" || property === "then") {
        return undefined
      }
      return makeSdkProxy([...path, property])
    },
    apply(_target, _thisArg, args) {
      return currentClient().then((client) => {
        let parent: any = client

        for (let i = 0; i < path.length - 1; i++) {
          parent = parent[path[i]]
        }

        const method = parent[path[path.length - 1]]

        return method.apply(parent, args)
      })
    },
  })
}

export const sdk = makeSdkProxy([]) as unknown as Medusa
