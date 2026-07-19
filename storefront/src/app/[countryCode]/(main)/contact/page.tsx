import { Metadata } from "next"
import { getStoreName } from "@lib/tenants"
import ContactForm from "@modules/contact/components/contact-form"

export async function generateMetadata(): Promise<Metadata> {
  const storeName = await getStoreName()
  return {
    title: "Contact",
    description: `Get in touch with ${storeName}.`,
    alternates: { canonical: "/contact" },
    robots: { index: true, follow: true },
  }
}

export default async function ContactPage() {
  const storeName = await getStoreName()
  return (
    <div className="content-container py-12 max-w-3xl">
      <h1 className="text-2xl-semi mb-4">Contact {storeName}</h1>
      <p className="text-base-regular text-ui-fg-subtle mb-8">
        Have a question about an order or a product? Send us a message and
        we'll get back to you.
      </p>
      <ContactForm />
    </div>
  )
}
