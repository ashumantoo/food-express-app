import { deleteSession } from "@/utils/session";
import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });

  //Delete session from cookies
  await deleteSession()
  return response;
}
