import { getSession } from "@/lib/authActions";
import { NextResponse } from "next/server";

export async function GET(req) {
  // console.log("chceking token via api route");
  const result = await getSession();
  console.log("chceking token via api route result", result);
  // const result = await checkRefresh();
  return NextResponse.json({ user: result });
}
