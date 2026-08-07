import { getBaseURL } from "@lib/util/env"
import { getStoreName } from "@lib/tenants"
import { Metadata } from "next"
import { Mona_Sans } from "next/font/google"
import "styles/globals.css"

const monaSans = Mona_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  variable: "--font-mona-sans",
})

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  const storeName = await getStoreName()

  return {
    metadataBase: new URL(await getBaseURL()),
    title: {
      default: storeName,
      template: `%s | ${storeName}`,
    },
    description: `Shop at ${storeName}.`,
  }
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-mode="light"
      className={`${monaSans.variable} ${monaSans.className}`}
    >
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
