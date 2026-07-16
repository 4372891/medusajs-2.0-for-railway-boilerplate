"use client"

import { clx } from "@medusajs/ui"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const sortOptions = [
  { value: "created_at", label: "Latest Arrivals" },
  { value: "price_asc", label: "Price: Low -> High" },
  { value: "price_desc", label: "Price: High -> Low" },
]

// Shorter labels for the compact mobile pills
const mobileOptions = [
  { value: "created_at", label: "Latest" },
  { value: "price_asc", label: "Price ↑" },
  { value: "price_desc", label: "Price ↓" },
]

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <div className="w-full">
      {/* Mobile: horizontal pill buttons */}
      <div className="small:hidden flex items-center gap-2 w-full">
        <span className="hidden text-ui-fg-subtle text-sm mr-1 whitespace-nowrap">Sort by:</span>
        {mobileOptions.map((o) => (
          <button
            key={o.value}
            onClick={() => handleChange(o.value as SortOptions)}
            className={clx(
              "px-3 py-1.5 rounded-md border text-sm transition-colors whitespace-nowrap",
              o.value === sortBy
                ? "border-ui-fg-base text-ui-fg-base font-medium"
                : "border-ui-border-base text-ui-fg-subtle hover:text-ui-fg-base"
            )}
          >
            {o.label}
          </button>
        ))}
      </div>

      {/* Desktop: the vertical radio list (unchanged) */}
      <div className="hidden small:block">
        <FilterRadioGroup
          title="Sort by"
          items={sortOptions}
          value={sortBy}
          handleChange={handleChange}
          data-testid={dataTestId}
        />
      </div>
    </div>
  )
}

export default SortProducts
