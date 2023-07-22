import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'
import jwt_decode from "jwt-decode"
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get("token")?.value
  if (token) {
    const decodeCode: any = jwt_decode(token)
    if (decodeCode.UserRole === "Driver" && path.startsWith("/driver")) {
      return NextResponse.next()
    } else
      if (decodeCode.UserRole === "Driver" && path !== "/driver") {
        return NextResponse.redirect(new URL('/driver', request.url))
      } else if (decodeCode.UserRole === "Customer" && path.startsWith("/user")) {
        return NextResponse.next()
      }
      else if (decodeCode.UserRole === "Customer" && path !== "/user") {
        return NextResponse.redirect(new URL('/user', request.url))
      }
    return NextResponse.next()
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/auth/:path*", "/user/:path*", "/driver/:path*"],
}