"use client"

import { Text, clx } from "@medusajs/ui"

import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
}

const Item = ({ item, type = "full" }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { handle } = item.variant?.product ?? {}

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  const maxQuantity = 10

  return (
    <div
      className="flex gap-4 py-4 border-b border-ui-border-base last:border-b-0"
      data-testid="product-row"
    >
      {/* Thumbnail */}
      <LocalizedClientLink
        href={`/products/${handle}`}
        className={clx("flex shrink-0", {
          "w-16": type === "preview",
          "w-20 small:w-24": type === "full",
        })}
      >
        <Thumbnail
          thumbnail={item.variant?.product?.thumbnail}
          images={item.variant?.product?.images}
          size="square"
        />
      </LocalizedClientLink>

      {/* Details */}
      <div className="flex flex-1 flex-col small:flex-row small:items-center gap-2 min-w-0">
        {/* Title + variant */}
        <div className="flex-1 min-w-0">
          <Text
            className="txt-medium-plus text-ui-fg-base"
            data-testid="product-title"
          >
            {item.product_title}
          </Text>
          <LineItemOptions
            variant={item.variant}
            data-testid="product-variant"
          />
        </div>

        {type === "full" && (
          <>
            {/* Quantity */}
            <div className="flex gap-2 items-center">
              <DeleteButton
                id={item.id}
                data-testid="product-delete-button"
              />
              <CartItemSelect
                value={item.quantity}
                onChange={(value) =>
                  changeQuantity(parseInt(value.target.value))
                }
                className="w-14 h-10 p-4"
                data-testid="product-select-button"
              >
                {Array.from(
                  { length: Math.min(maxQuantity, 10) },
                  (_, i) => (
                    <option value={i + 1} key={i}>
                      {i + 1}
                    </option>
                  )
                )}
              </CartItemSelect>
              {updating && <Spinner />}
            </div>

            {/* Unit price (desktop only, to keep mobile clean) */}
            <div className="hidden small:block small:w-24 text-right">
              <LineItemUnitPrice item={item} style="tight" />
            </div>
          </>
        )}

        {/* Line total */}
        <div
          className={clx("text-right", {
            "small:w-28": type === "full",
          })}
        >
          {type === "preview" && (
            <span className="flex gap-x-1 justify-end text-ui-fg-muted">
              <Text>{item.quantity}x</Text>
              <LineItemUnitPrice item={item} style="tight" />
            </span>
          )}
          <LineItemPrice item={item} style="tight" />
        </div>
      </div>

      <ErrorMessage error={error} data-testid="product-error-message" />
    </div>
  )
}

export default Item
