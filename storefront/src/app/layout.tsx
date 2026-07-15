import { getBaseURL } from "@lib/util/env"
import { getStoreName } from "@lib/tenants"
import { Metadata } from "next"
import "styles/globals.css"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  const storeName = await getStoreName()

  return {
    metadataBase: new URL(getBaseURL()),
    title: {
      default: storeName,
      template: `%s | ${storeName}`,
    },
    description: `Shop at ${storeName}.`,
  }
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
