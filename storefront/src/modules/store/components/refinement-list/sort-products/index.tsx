"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"
import NativeSelect from "@modules/common/components/native-select"

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

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <div>
      {/* Mobile: compact dropdown */}
      <div className="small:hidden w-full max-w-[220px]">
        <NativeSelect
          value={sortBy}
          onChange={(e) => handleChange(e.target.value as SortOptions)}
          data-testid={dataTestId}
          className="!py-1 text-sm"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </NativeSelect>
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
