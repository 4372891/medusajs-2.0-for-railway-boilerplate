"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

/**
 * Specs are stored in the product's "subtitle" field as:
 *   Key: Value | Key: Value | Key: Value
 * e.g. "Formulation: Cream | Finish: Matte | Use: Daily"
 */
const parseSpecs = (subtitle?: string | null) => {
  if (!subtitle) {
    return []
  }

  return subtitle
    .split("|")
    .map((part) => {
      const [label, ...rest] = part.split(":")
      const value = rest.join(":").trim()

      if (!label || !value) {
        return null
      }

      return { label: label.trim(), value }
    })
    .filter(Boolean) as { label: string; value: string }[]
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const specs = parseSpecs(product.subtitle)

  const tabs = [
    // Only show the specs tab when the product actually has specs.
    ...(specs.length
      ? [
          {
            label: "Product Information",
            component: <ProductInfoTab specs={specs} />,
          },
        ]
      : []),
    {
      label: "Shipping & Returns",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({
  specs,
}: {
  specs: { label: string; value: string }[]
}) => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 small:grid-cols-2 gap-x-8 gap-y-4">
        {specs.map((spec) => (
          <div key={spec.label}>
            <span className="font-semibold">{spec.label}</span>
            <p>{spec.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">Fast Delivery</span>
            <p className="max-w-sm">
              Worldwide shipping. Your package will arrive in 7-10 business days in the comfort of your home.
            </p>
          </div>
        </div>  
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">Easy Returns</span>
            <p className="max-w-sm">
              Just return your product and we'll refund your money. No questions asked – we'll do our best to make sure your return is hassle-free.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
