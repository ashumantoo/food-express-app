import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers';
import { decrypt } from './utils/session';
import { RoleTypeEnum } from './utils/const';


// 1. Specify protected and public routes
const protectedRoutes = [
  '/restaurant-owner/dashboard',
  '/restaurant-owner/customers',
  '/restaurant-owner/invoices',
  '/restaurant-owner/menu',
  '/restaurant-owner/orders',
  '/restaurant-owner/settings',
  '/profile',
  '/orders'
]
const publicRoutes = [
  '/login',
  '/register'
]

// This function can be marked `async` if using `await` inside
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie);

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute) {
    if (!session?.userId) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    } else if (session?.role === RoleTypeEnum.RESTAURANT_OWNER && !req.nextUrl.pathname.startsWith('/restaurant-owner')) {
      return NextResponse.redirect(new URL('/restaurant-owner/dashboard', req.nextUrl));
    } else if (session?.role === RoleTypeEnum.USER && req.nextUrl.pathname.startsWith('/restaurant-owner')) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId
  ) {
    if (session?.role === RoleTypeEnum.USER) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    } else {
      return NextResponse.redirect(new URL('/restaurant-owner/dashboard', req.nextUrl));
    }
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     '/',
//     '/register',
//     '/login',
//     '/logout',
//     '/restaurant-owner/:path*'
//   ],
// }
