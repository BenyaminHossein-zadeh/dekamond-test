import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const userToken = request.cookies.get('userToken')?.value
  
  if (!userToken && request.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('Middleware: Redirecting to auth - no userToken found')
    return NextResponse.redirect(new URL('/auth', request.url))
  }
  
  if (userToken && request.nextUrl.pathname === '/auth') {
    console.log('Middleware: Redirecting to dashboard - user already authenticated')
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth'
  ]
}