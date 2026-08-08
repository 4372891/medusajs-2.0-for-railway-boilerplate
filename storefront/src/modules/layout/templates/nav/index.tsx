import { Suspense } from "react"
import { getCustomer } from "@lib/data/customer"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { UserIcon, SearchIcon, BagIcon } from "@modules/layout/components/nav-icons"
import { getStoreName } from "@lib/tenants"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const storeName = await getStoreName()
  const customer = await getCustomer().catch(() => null)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-18 small:h-21 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container text-ui-fg-base flex items-center justify-between w-full h-full text-base-regular">
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="text-xl font-medium hover:opacity-70 transition-opacity"
              data-testid="nav-store-link"
            >
              {storeName}
            </LocalizedClientLink>
          </div>

          <div className="hidden small:flex items-center gap-x-8 h-full">
            <LocalizedClientLink
              className="hover:opacity-70 transition-opacity"
              href="/"
            >
              Shop
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-4 small:gap-x-6 h-full">
            {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
              <LocalizedClientLink
                className="hidden small:flex items-center hover:opacity-70 transition-opacity"
                href="/search"
                scroll={false}
                aria-label="Search"
                data-testid="nav-search-link"
              >
                <SearchIcon className="w-6 h-6" />
              </LocalizedClientLink>
            )}

            <LocalizedClientLink
              className="flex items-center hover:opacity-70 transition-opacity"
              href="/account"
              aria-label={customer?.first_name ? "Your account" : "Sign in"}
              title={customer?.first_name ? `Hi, ${customer.first_name}` : "Account"}
              data-testid="nav-account-link"
            >
              <UserIcon className="w-6 h-6" />
            </LocalizedClientLink>

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex items-center hover:opacity-70 transition-opacity"
                  href="/cart"
                  aria-label="Open cart"
                  data-testid="nav-cart-link"
                >
                  <BagIcon className="w-6 h-6" />
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>

            <div className="h-full small:hidden">
              <SideMenu regions={regions} />
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
