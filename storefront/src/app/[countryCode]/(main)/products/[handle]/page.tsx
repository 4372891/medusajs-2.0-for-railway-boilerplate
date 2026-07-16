import { Metadata } from "next"
import { notFound } from "next/navigation"

import ProductTemplate from "@modules/products/templates"
import { getRegion, listRegions } from "@lib/data/regions"
import { getProductByHandle, getProductsList } from "@lib/data/products"
export const dynamic = "force-dynamic"

type Props = {
  params: { countryCode: string; handle: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const product = await getProductByHandle(handle, region.id)

  if (!product) {
    notFound()
  }

  // Use the product's real description; fall back to a title-based line.
  const description =
    product.description ||
    product.subtitle ||
    `${product.title} — available now.`

  return {
    title: `${product.title}`,
    description,
    alternates: {
      canonical: `/products/${handle}`,
    },
    openGraph: {
      title: `${product.title}`,
      description,
      type: "website",
      images: product.thumbnail ? [product.thumbnail] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title}`,
      description,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const pricedProduct = await getProductByHandle(params.handle, region.id)
  if (!pricedProduct) {
    notFound()
  }

  return (
    <ProductTemplate
      product={pricedProduct}
      region={region}
      countryCode={params.countryCode}
    />
  )
}
