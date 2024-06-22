import { NextResponse } from "next/server";
import { BASE_URL, NEXT_URL } from "@/lib/constants";
import { getSession, getRefresh, getVerify, logout } from "@/lib/authActions";

export async function middleware(request) {
  // let sessionCookie = request.cookies.get("session");

  const session = await getSession();

  // console.log("running middlware - sessionCookie", sessionCookie);
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
