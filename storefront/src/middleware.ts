import { NextRequest, NextResponse } from "next/server"

// The single region code used for every visitor, worldwide.
// Must be a country that exists in your Medusa region.
const FIXED_COUNTRY_CODE = (
  process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"
).toLowerCase()

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // Internally serve every route as /{code}/... without showing it in the URL.
  const url = request.nextUrl.clone()
  url.pathname = `/${FIXED_COUNTRY_CODE}${pathname}`

  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png|.*\\.jpg|.*\\.gif|.*\\.svg).*)",
  ],
}
