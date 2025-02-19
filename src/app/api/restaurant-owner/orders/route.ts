import { connectDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/order";
import { cookies } from "next/headers";
import { decrypt } from "@/utils/session";
import { RoleTypeEnum } from "@/utils/const";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie);
    if (!session)
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    if (session && session.role === RoleTypeEnum.USER)
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const orders = await Order.find({ restaurant: session?.restaurantId }).populate("items.foodItem").populate('user');
    return NextResponse.json({
      success: true,
      data: orders
    }, {
      status: 200
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const searchParams = req.nextUrl.searchParams
    const id = searchParams.get('orderId');
    const body = await req.json();
    await connectDB();
    if (!id) {
      return NextResponse.json({ success: false, message: "OrderId not found" }, { status: 400 });
    }
    const existingOrder = await Order.find({ _id: new mongoose.Types.ObjectId(id) });
    if (!existingOrder) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 400 });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, body, { new: true });

    if (!updatedOrder) {
      return NextResponse.json({ success: false, message: 'Something went wront on updating order' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder
    }, {
      status: 200
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}