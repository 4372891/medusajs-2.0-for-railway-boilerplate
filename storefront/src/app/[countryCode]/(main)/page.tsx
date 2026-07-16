import { Metadata } from "next"

import StoreTemplate from "@modules/store/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getCurrentStoreData } from "@lib/tenants"

export async function generateMetadata(): Promise<Metadata> {
  const store = await getCurrentStoreData()
  return {
    title: store.seoTitle || store.name,
    description:
      store.seoDescription || `Shop ${store.name}. Worldwide shipping and secure checkout.`,
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
  const store = await getCurrentStoreData()

  return (
    <>
      {(store.heroHeading || store.introText) && (
        <div className="content-container pt-8 pb-4">
          {store.heroHeading && (
            <h1 className="text-2xl-semi mb-2">{store.heroHeading}</h1>
          )}
          {store.introText && (
            <p className="text-base-regular text-ui-fg-subtle max-w-3xl">
              {store.introText}
            </p>
          )}
        </div>
      )}
      <StoreTemplate sortBy={sortBy} page={page} countryCode={countryCode} />
    </>
  )
}
