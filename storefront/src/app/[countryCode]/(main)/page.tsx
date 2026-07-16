import { Metadata } from "next"

import StoreTemplate from "@modules/store/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getStoreName } from "@lib/tenants"

export async function generateMetadata(): Promise<Metadata> {
  const storeName = await getStoreName()
  return {
    description: `Shop ${storeName}. Fast worldwide shipping and secure checkout.`,
    alternates: { canonical: "/" },
  }
}

type Props = {
  searchParams: Promise<{ sortBy?: SortOptions; page?: string }>
  params: Promise<{ countryCode: string }>
}

export default async function Home({ searchParams, params }: Props) {
  const { countryCode } = await params
  const { sortBy, page } = await searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={countryCode}
    />
  )
}
