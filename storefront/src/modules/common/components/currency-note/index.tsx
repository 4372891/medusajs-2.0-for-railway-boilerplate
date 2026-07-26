"use client"

import React from "react"

/**
 * COURTESY CONVERSION — display only.
 * The customer is still charged in the store's currency (USD). This just shows
 * an approximate amount in a few major currencies so shoppers get a feel for
 * the price. Their bank sets the real rate.
 *
 * ==== EDIT THESE RATES MANUALLY ====
 * Each number is "how many of this currency = 1 USD".
 * Update every so often from any converter (e.g. google "usd to eur").
 */
const RATES_PER_USD: { code: string; symbol: string; rate: number }[] = [
  { code: "EUR", symbol: "€", rate: 0.92 },
  { code: "GBP", symbol: "£", rate: 0.79 },
  { code: "CAD", symbol: "C$", rate: 1.37 },
  { code: "AUD", symbol: "A$", rate: 1.53 },
]

type Props = {
  /** the store total, in major units (e.g. dollars, not cents) */
  amount: number
  currencyCode: string
}

const CurrencyNote: React.FC<Props> = ({ amount, currencyCode }) => {
  // Only show the note when the store is actually pricing in USD.
  if ((currencyCode || "").toLowerCase() !== "usd" || !amount) {
    return null
  }

  return (
    <div className="mt-3 text-ui-fg-subtle txt-small">
      <p className="mb-1">Approximate in other currencies:</p>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {RATES_PER_USD.map(({ code, symbol, rate }) => {
          const converted = amount * rate
          return (
            <span key={code}>
              {symbol}
              {converted.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}{" "}
              {code}
            </span>
          )
        })}
      </div>
      <p className="mt-1 text-ui-fg-muted">
        You'll be charged in USD. Your bank sets the final rate.
      </p>
    </div>
  )
}

export default CurrencyNote
