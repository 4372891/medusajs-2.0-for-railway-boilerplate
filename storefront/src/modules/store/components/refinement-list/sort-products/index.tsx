"use client"

import { ChevronUpDown } from "@medusajs/icons"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const sortOptions = [
  { value: "created_at", label: "Latest arrivals" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
]

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  return (
    <div
      className="relative inline-flex items-center h-9 border border-ui-border-base rounded-full transition-colors hover:border-ui-fg-base focus-within:border-ui-fg-base"
      data-testid={dataTestId}
    >
      <select
        value={sortBy}
        onChange={(e) => setQueryParams("sortBy", e.target.value as SortOptions)}
        aria-label="Sort products"
        className="appearance-none bg-transparent border-none outline-none cursor-pointer pl-4 pr-9 text-small-regular text-ui-fg-base"
      >
        {sortOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className="absolute right-3 inset-y-0 flex items-center pointer-events-none text-ui-fg-muted">
        <ChevronUpDown />
      </span>
    </div>
  )
}

export default SortProducts
