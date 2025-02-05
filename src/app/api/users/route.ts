import { connectDB } from "@/utils/db";
import User from '@/models/user';
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find();
    return NextResponse.json({
      success: true,
      data: users
    }, {
      status: 200
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}