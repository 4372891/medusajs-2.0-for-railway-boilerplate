import { Metadata } from "next"
import { getStoreName } from "@lib/tenants"

export async function generateMetadata(): Promise<Metadata> {
  const storeName = await getStoreName()
  return {
    title: "Shipping & Returns",
    description: `Shipping and returns policy for ${storeName}.`,
    robots: { index: true, follow: true },
  }
}

export default async function ShippingPage() {
  const storeName = await getStoreName()
  return (
    <div className="content-container py-12 max-w-3xl">
      <h1 className="text-2xl-semi mb-6">Shipping & Returns</h1>
      <div className="text-base-regular text-ui-fg-subtle flex flex-col gap-4">
        <h2 className="text-xl-semi text-ui-fg-base">Shipping</h2>
        <p>
          {storeName} ships worldwide. Orders are processed within a few
          business days. Delivery times vary by destination.
        </p>
        <h2 className="text-xl-semi text-ui-fg-base mt-4">Returns</h2>
        <p>
          If you are not satisfied with your purchase, you may request a return
          within the period allowed by your local consumer laws. Items must be
          unused and in their original condition.
        </p>
      </div>
    </div>
  )
}
