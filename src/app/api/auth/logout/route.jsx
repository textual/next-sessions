import { logout } from "@/lib/authActions";
import { NextResponse } from "next/server";

export async function GET(req) {
  console.log("loging out");
  await logout();
  return NextResponse.json({ ok: true });
}
