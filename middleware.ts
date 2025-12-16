import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Role } from "./lib/constants/role";

const protectedRoutes = [
  "/owner-home",
  "/tenant-home",
  "/flat-management",
  "/tenant-management",
  "/upload-notice",
  "/electrcity-entry",
  "/complain",
  "/moveout",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;
  const isAuthenticated = !!accessToken;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && (pathname === "/login" || pathname === "/signup")) {
    const userRole = request.cookies.get("user_role")?.value;

    if (userRole === Role.TENANT) {
      return NextResponse.redirect(new URL("/tenant-home", request.url));
    }

    if (userRole === Role.OWNER) {
      return NextResponse.redirect(new URL("/owner-home", request.url));
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)"],
};
