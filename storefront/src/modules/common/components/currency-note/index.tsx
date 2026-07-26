"use client"

import React from "react"

/**
 * COURTESY CONVERSION — display only.
 * The customer is charged in the store currency (USD). Based on the shipping
 * country they selected, we show ONE approximate local amount. Their bank sets
 * the real rate.
 *
 * ==== EDIT THESE RATES MANUALLY (units per 1 USD) ====
 * Update occasionally from any converter (e.g. google "usd to eur").
 */
const CURRENCIES: Record<
  string,
  { symbol: string; code: string; rate: number; symbolAfter?: boolean }
> = {
  EUR: { symbol: "€", code: "EUR", rate: 0.92 },
  GBP: { symbol: "£", code: "GBP", rate: 0.79 },
  CAD: { symbol: "CA$", code: "CAD", rate: 1.37 },
  AUD: { symbol: "AU$", code: "AUD", rate: 1.53 },
  CHF: { symbol: "CHF ", code: "CHF", rate: 0.88 },
  SEK: { symbol: "", code: "SEK", rate: 10.7, symbolAfter: true },
  NOK: { symbol: "", code: "NOK", rate: 10.6, symbolAfter: true },
  DKK: { symbol: "", code: "DKK", rate: 6.9, symbolAfter: true },
  PLN: { symbol: "", code: "PLN", rate: 3.95, symbolAfter: true },
  JPY: { symbol: "¥", code: "JPY", rate: 157 },
  INR: { symbol: "₹", code: "INR", rate: 83 },
  TRY: { symbol: "", code: "TRY", rate: 34, symbolAfter: true },
  BRL: { symbol: "R$", code: "BRL", rate: 5.1 },
  MXN: { symbol: "MX$", code: "MXN", rate: 16.7 },
}

// Which currency a shipping country maps to (ISO-2 country -> currency key)
const COUNTRY_TO_CURRENCY: Record<string, string> = {
  at: "EUR", be: "EUR", cy: "EUR", ee: "EUR", fi: "EUR", fr: "EUR",
  de: "EUR", gr: "EUR", ie: "EUR", it: "EUR", lv: "EUR", lt: "EUR",
  lu: "EUR", mt: "EUR", nl: "EUR", pt: "EUR", sk: "EUR", si: "EUR",
  es: "EUR",
  gb: "GBP", ca: "CAD", au: "AUD", ch: "CHF", se: "SEK", no: "NOK",
  dk: "DKK", pl: "PLN", jp: "JPY", in: "INR", tr: "TRY", br: "BRL",
  mx: "MXN",
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
  if (
    (currencyCode || "").toLowerCase() !== "usd" ||
    !amount ||
    !countryCode
  ) {
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

  const display = c.symbolAfter
    ? `${number} ${c.code}`
    : `${c.symbol}${number}`

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
