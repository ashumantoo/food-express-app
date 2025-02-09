import { connectDB } from "@/utils/db";
import Menu from '@/models/menu';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const limit = searchParams.get('limit');
    await connectDB();
    let meals = [];
    if (limit) {
      meals = await Menu.find().limit(parseInt(limit));
    } else {
      meals = await Menu.find();
    }
    return NextResponse.json({
      success: true,
      data: meals
    }, {
      status: 200
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}