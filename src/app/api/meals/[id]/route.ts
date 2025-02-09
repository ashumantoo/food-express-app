import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";
import Menu from '@/models/menu';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const meal = await Menu.findById(id);

    if (!meal) {
      return NextResponse.json({ success: false, message: 'meal not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: meal }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}