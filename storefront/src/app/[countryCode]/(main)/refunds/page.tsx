import { Metadata } from "next"
import { getStoreName } from "@lib/tenants"

export async function generateMetadata(): Promise<Metadata> {
  const storeName = await getStoreName()
  return {
    title: "Refund Policy",
    description: `Refund policy for ${storeName}.`,
    robots: { index: true, follow: true },
  }
}

export default async function RefundsPage() {
  const storeName = await getStoreName()
  return (
    <div className="content-container py-12 max-w-3xl">
      <h1 className="text-2xl-semi mb-6">Refund Policy</h1>
      <div className="text-base-regular text-ui-fg-subtle flex flex-col gap-4">
        <p>
          {storeName} wants you to be happy with your purchase. Refunds are
          issued to the original payment method once an approved return is
          received, or for eligible orders as required by law.
        </p>
      </div>
    </div>
  )
}
