export type Store = {
  domain: string
  name: string
  publishableKey: string
  // --- SEO fields (all optional; blank = safe fallback) ---
  seoTitle?: string       // 50–60 chars, keyword-first. Browser tab + Google title.
  seoDescription?: string // 150–160 chars, keyword-rich, with a call to action.
  heroHeading?: string    // The on-page H1. Keyword phrased differently from the title.
  introText?: string      // Short intro under the H1 (1–2 sentences).
  footerText?: string     // Long-form keyword block for the footer (aim ~300 words).
}

export const DEFAULT_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

export const stores: Store[] = [
  {
    domain: "birthdaysongmusic.com",
    name: "Waterproof Shoes",
    publishableKey: "pk_ff1ae81b16a5762e621135f6e9123614ca3f70dc407242ecb02f269b25ca5f81",
    seoTitle: "Waterproof Shoes & Boots — Free Worldwide Shipping",
    seoDescription:
      "Shop waterproof shoes, boots and rain-ready footwear for every season. Fast worldwide shipping and secure checkout. Order today.",
    heroHeading: "Waterproof Shoes for Rain, Trails & Everyday",
    introText:
      "Keep your feet dry in any weather with our range of waterproof footwear.",
    footerText:
      "Write ~300 words here about waterproof shoes — materials, use cases, sizing, who they're for. Sprinkle keywords naturally.",
  },
  {
    domain: "huchip.me",
    name: "Leather Boots",
    publishableKey: "pk_7794b35f2074fdbf7fc58f28c87315977a3b3af3f7563d36297569d4b608bcb9",
    seoTitle: "Real Leather Boots, Faux Leather Boots & Sandals",
    seoDescription:
      "Shop genuine and faux leather boots plus leather sandals. Handcrafted quality, worldwide shipping, secure checkout. Find your pair today.",
    heroHeading: "Leather Boots & Sandals, Built to Last",
    introText:
      "Medusa now ships time-based one-time password (TOTP) multi-factor authentication as part of the core Auth Module.This gives Medusa applications a first-class way to add authenticator-app based MFA for admin users, customers, or any custom actor type, without building a custom auth provider or relying on a hosted auth service. MFA adds a second verification step after the first authentication factor. Once enabled, a successful login no longer returns a token directly. Instead, Medusa returns an MFA challenge that the user completes with a code from an app like 1Password, Authy, Google Authenticator, or Microsoft Authenticator. Because MFA lives in the Auth Module, it works across auth providers and actor types. The same core flow can protect admin users signing into the dashboard, customers signing into a storefront, or custom actors in your own application.Medusa now ships time-based one-time password (TOTP) multi-factor authentication as part of the core Auth Module.This gives Medusa applications a first-class way to add authenticator-app based MFA for admin users, customers, or any custom actor type, without building a custom auth provider or relying on a hosted auth service. MFA adds a second verification step after the first authentication factor. Once enabled, a successful login no longer returns a token directly. Instead, Medusa returns an MFA challenge that the user completes with a code from an app like 1Password, Authy, Google Authenticator, or Microsoft Authenticator. Because MFA lives in the Auth Module, it works across auth providers and actor types. The same core flow can protect admin users signing into the dashboard, customers signing into a storefront, or custom actors in your own application. Medusa now ships time-based one-time password (TOTP) multi-factor authentication as part of the core Auth Module.This gives Medusa applications a first-class way to add authenticator-app based MFA for admin users, customers, or any custom actor type, without building a custom auth provider or relying on a hosted auth service. MFA adds a second verification step after the first authentication factor. Once enabled, a successful login no longer returns a token directly. Instead, Medusa returns an MFA challenge that the user completes with a code from an app like 1Password, Authy, Google Authenticator, or Microsoft Authenticator. Because MFA lives in the Auth Module, it works across auth providers and actor types. The same core flow can protect admin users signing into the dashboard, customers signing into a storefront, or custom actors in your own application.
",
    footerText:
      "Write ~300 words here about your leather boots range. Talk styles, leather types, care, occasions. Natural keywords, no stuffing.",
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

import { headers } from "next/headers"

export async function getStoreName(): Promise<string> {
  try {
    const h = await headers()
    const host = h.get("x-forwarded-host") || h.get("host") || ""
    return getStoreForHost(host).name
  } catch {
    return "Store"
  }
}

export async function getCurrentStoreData(): Promise<Store> {
  try {
    const h = await headers()
    const host = h.get("x-forwarded-host") || h.get("host") || ""
    return getStoreForHost(host)
  } catch {
    return { domain: "", name: "Store", publishableKey: DEFAULT_PUBLISHABLE_KEY }
  }
}
