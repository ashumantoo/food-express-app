import { connectDB } from "@/utils/db";
import Menu from '@/models/menu';
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/utils/session";
import { RoleTypeEnum } from "@/utils/const";

export async function GET() {
  await connectDB();
  try {
    const menuItems = await Menu.find();
    return NextResponse.json({ success: true, data: menuItems });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching menu items" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectDB();
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie);
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  if (session && session.role === RoleTypeEnum.USER) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const newMenuItem = await Menu.create({ ...data, restaurantId: session?.restaurantId });
    return NextResponse.json({ success: true, data: newMenuItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error creating menu item" }, { status: 500 });
  }
}
