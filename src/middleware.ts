import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api/|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  const isMainDomain =
    hostname.includes("bio.puretoolhub.com") ||
    hostname.includes("localhost") ||
    hostname.includes("snap-bio.vercel.app") ||
    hostname.includes("127.0.0.1");

  if (!isMainDomain && hostname && url.pathname === "/") {
    const cleanHost = hostname.replace(/:\d+$/, "");
    return NextResponse.rewrite(new URL("/p?domain=" + encodeURIComponent(cleanHost), req.url));
  }

  return NextResponse.next();
}
