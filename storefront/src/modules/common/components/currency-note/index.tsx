"use client"

import React from "react"

/**
 * COURTESY CONVERSION — display only.
 * Customer is charged in the store currency (USD). Based on the shipping
 * country they selected, we show ONE approximate local amount.
 *
 * ==== RATES: units per 1 USD ====
 * Source: ECB reference rates / mid-market, ~24 July 2026.
 * These drift daily — update occasionally from google "usd to <currency>".
 */
const CURRENCIES: Record<
  string,
  { symbol: string; code: string; rate: number; symbolAfter?: boolean }
> = {
  EUR: { symbol: "€", code: "EUR", rate: 0.875 },
  GBP: { symbol: "£", code: "GBP", rate: 0.749 },
  CAD: { symbol: "CA$", code: "CAD", rate: 1.409 },
  AUD: { symbol: "AU$", code: "AUD", rate: 1.430 },
  CHF: { symbol: "", code: "CHF", rate: 0.817, symbolAfter: true },
  SEK: { symbol: "", code: "SEK", rate: 9.68, symbolAfter: true },
  NOK: { symbol: "", code: "NOK", rate: 9.85, symbolAfter: true },
  DKK: { symbol: "", code: "DKK", rate: 6.53, symbolAfter: true },
  PLN: { symbol: "", code: "PLN", rate: 3.66, symbolAfter: true },
  CZK: { symbol: "", code: "CZK", rate: 21.0, symbolAfter: true },
  HUF: { symbol: "", code: "HUF", rate: 338, symbolAfter: true },
  RON: { symbol: "", code: "RON", rate: 4.40, symbolAfter: true },
  JPY: { symbol: "¥", code: "JPY", rate: 163.7 },
  INR: { symbol: "₹", code: "INR", rate: 87 },
  TRY: { symbol: "", code: "TRY", rate: 40.5, symbolAfter: true },
  BRL: { symbol: "R$", code: "BRL", rate: 5.5 },
  MXN: { symbol: "MX$", code: "MXN", rate: 18.5 },
  NZD: { symbol: "NZ$", code: "NZD", rate: 1.66 },
  ZAR: { symbol: "", code: "ZAR", rate: 17.7, symbolAfter: true },
  SGD: { symbol: "S$", code: "SGD", rate: 1.28 },
  HKD: { symbol: "HK$", code: "HKD", rate: 7.85 },
  CNY: { symbol: "¥", code: "CNY", rate: 7.2 },
}

/**
 * Shipping country (ISO-2) -> currency.
 * Eurozone = the 21 EU members using the euro in 2026 (incl. Croatia 2023,
 * Bulgaria 2026), plus micro-states that use the euro (mc, sm, va, ad).
 */
const COUNTRY_TO_CURRENCY: Record<string, string> = {
  // Eurozone (21)
  at: "EUR", be: "EUR", bg: "EUR", hr: "EUR", cy: "EUR", ee: "EUR",
  fi: "EUR", fr: "EUR", de: "EUR", gr: "EUR", ie: "EUR", it: "EUR",
  lv: "EUR", lt: "EUR", lu: "EUR", mt: "EUR", nl: "EUR", pt: "EUR",
  sk: "EUR", si: "EUR", es: "EUR",
  // Non-EU euro users
  mc: "EUR", sm: "EUR", va: "EUR", ad: "EUR", me: "EUR", xk: "EUR",
  // Non-euro EU
  dk: "DKK", se: "SEK", pl: "PLN", cz: "CZK", hu: "HUF", ro: "RON",
  // Rest of world
  gb: "GBP", ca: "CAD", au: "AUD", nz: "NZD", ch: "CHF", no: "NOK",
  jp: "JPY", in: "INR", tr: "TRY", br: "BRL", mx: "MXN", za: "ZAR",
  sg: "SGD", hk: "HKD", cn: "CNY",
}

type Props = {
  amount?: number | null
  currencyCode?: string | null
  countryCode?: string | null
}

const CurrencyNote: React.FC<Props> = ({
  amount,
  currencyCode,
  countryCode,
}) => {
  if ((currencyCode || "").toLowerCase() !== "usd" || !amount || !countryCode) {
    return null
  }

  const key = COUNTRY_TO_CURRENCY[countryCode.toLowerCase()]
  if (!key) {
    return null
  }

  const c = CURRENCIES[key]
  const converted = amount * c.rate
  const number = converted.toLocaleString(undefined, {
    maximumFractionDigits: 0,
  })
  const display = c.symbolAfter ? `${number} ${c.code}` : `${c.symbol}${number}`

  return (
    <div className="mt-2 txt-small text-ui-fg-subtle">
      <span>Approximately {display}</span>
      <span className="text-ui-fg-muted">
        {" "}
        — charged in USD, your bank sets the final rate.
      </span>
    </div>
  )
}

export default CurrencyNote
