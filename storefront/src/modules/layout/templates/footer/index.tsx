import { getStoreName, getCurrentStoreData } from "@lib/tenants"
import { getCollectionsList } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const storeName = await getStoreName()
  const store = await getCurrentStoreData()

  return (
    <footer className="bg-grey-10 w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-12 xsmall:flex-row items-start justify-between py-16 small:py-26">
          <div className="flex flex-col gap-y-4 max-w-md">
            <LocalizedClientLink
              href="/"
              className="text-xl font-medium hover:opacity-70 transition-opacity"
            >
              {storeName}
            </LocalizedClientLink>
            {store.footerText && (
              <p className="text-small-regular text-ui-fg-subtle whitespace-pre-line">
                {store.footerText}
              </p>
            )}
          </div>
          <div className="text-small-regular gap-y-10 gap-x-12 md:gap-x-20 grid grid-cols-2 sm:grid-cols-3">
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="txt-small-plus text-ui-fg-base">
                  Collections
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-y-3 text-ui-fg-subtle txt-small",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fg-base"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-3">
              <span className="txt-small-plus text-ui-fg-base">Information</span>
              <ul className="grid grid-cols-1 gap-y-3 text-ui-fg-subtle txt-small">
                <li>
                  <LocalizedClientLink href="/terms" className="hover:text-ui-fg-base">
                    Terms & Conditions
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/shipping" className="hover:text-ui-fg-base">
                    Shipping & Returns
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/refunds" className="hover:text-ui-fg-base">
                    Refund Policy
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/contact" className="hover:text-ui-fg-base">
                    Contact
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 small:flex-row small:gap-y-0 w-full pb-10 justify-between text-ui-fg-muted">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} {storeName}. All rights reserved.
          </Text>
          <MedusaCTA />
        </div>
      </div>
    </footer>
  )
}
