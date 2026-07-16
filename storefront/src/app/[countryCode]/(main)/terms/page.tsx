import { Metadata } from "next"
import { getStoreName } from "@lib/tenants"

export async function generateMetadata(): Promise<Metadata> {
  const storeName = await getStoreName()
  return {
    title: "Terms & Conditions",
    description: `Terms and conditions for ${storeName}.`,
    robots: { index: true, follow: true },
  }
}

export default async function TermsPage() {
  const storeName = await getStoreName()
  return (
    <div className="content-container py-12 max-w-3xl">
      <h1 className="text-2xl-semi mb-6">Terms & Conditions</h1>
      <div className="text-base-regular text-ui-fg-subtle flex flex-col gap-4">
        <p>
          Welcome to {storeName}. By using this website and placing an order,
          you agree to the following terms and conditions. Please read them
          carefully.
        </p>
        <h2 className="text-xl-semi text-ui-fg-base mt-4">Orders</h2>
        <p>
          All orders are subject to acceptance and availability. Prices are
          shown in the currency displayed at checkout and include applicable
          taxes where required.
        </p>
        <h2 className="text-xl-semi text-ui-fg-base mt-4">Use of the site</h2>
        <p>
          You agree to use this site lawfully and not to misuse it in any way
          that could damage or impair its availability.
        </p>
        <h2 className="text-xl-semi text-ui-fg-base mt-4">Contact</h2>
        <p>
          For questions about these terms, please reach out through our contact
          page.
        </p>
      </div>
    </div>
  )
}
