import { connectDB } from "@/utils/db";
import Menu from '@/models/menu';
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/utils/session";
import { RoleTypeEnum } from "@/utils/const";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie);
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  if (session && session.role === RoleTypeEnum.USER) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const updatedMenuItem = await Menu.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json({ success: true, data: updatedMenuItem });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error updating menu item" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie);
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  if (session && session.role === RoleTypeEnum.USER) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  try {
    await Menu.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: "Menu item deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error deleting menu item" }, { status: 500 });
  }
}
