import { NextResponse } from "next/server";
import { BASE_URL, NEXT_URL } from "@/lib/constants";
import { getSession, getRefresh, getVerify, logout } from "@/lib/authActions";
import { axiosInstance } from "./lib/axios";

export async function middleware(request) {
  let sessionCookie = request.cookies.get("session");
  if (sessionCookie) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionCookie.value}`;
  }
  const session = await getSession();

  console.log("running middlware - sessionCookie", sessionCookie);
  console.log("running middlware - session", session);
  if (request.nextUrl.pathname.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(NEXT_URL + "/auth/login");
  }
  if (request.nextUrl.pathname.startsWith("/auth/login") && session) {
    return NextResponse.redirect(NEXT_URL + "/dashboard");
  }
  //   if (request.nextUrl.pathname.startsWith('/about')) {
  //     return NextResponse.rewrite(new URL('/about-2', request.url))
  //   }

  //   if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //     return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  //   }
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
