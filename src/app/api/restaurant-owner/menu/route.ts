import { connectDB } from "@/utils/db";
import Menu, { IMenu } from '@/models/menu';
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
    const body = await req.json() as IMenu;
    const menuData = {
      ...body,
      restaurantId: session?.restaurantId || ""
    }
    const newMenu = new Menu(menuData);
    const _newMenu = await newMenu.save();
    return NextResponse.json({
      success: true,
      message: "Menu created successfully",
      data: _newMenu
    }, {
      status: 201
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
