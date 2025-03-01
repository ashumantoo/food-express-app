import { connectDB } from "@/utils/db";
import Menu from '@/models/menu';
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/utils/session";
import { RoleTypeEnum } from "@/utils/const";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie);
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  if (session && session.role === RoleTypeEnum.USER) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const menu = await Menu.findById(id);
    return NextResponse.json({ success: true, data: menu });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetch menu item" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie);
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  if (session && session.role === RoleTypeEnum.USER) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const data = await req.json();
    const updatedMenuItem = await Menu.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json({ success: true, message: "Menu updated successfully", data: updatedMenuItem });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error updating menu item" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie);
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  if (session && session.role === RoleTypeEnum.USER) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    await Menu.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Menu item deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error deleting menu item" }, { status: 500 });
  }
}
