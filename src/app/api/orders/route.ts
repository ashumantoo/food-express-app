import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Order from "@/models/order";
import { cookies } from "next/headers";
import { decrypt } from "@/utils/session";
import { RoleTypeEnum } from "@/utils/const";

// 📌 Create a new order (POST)
export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const body = await req.json();
    const newOrder = new Order(body);
    await newOrder.save();
    return NextResponse.json({ success: true, message: "Order placed sucessfully", data: newOrder });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error creating order" }, { status: 500 });
  }
}

// 📌 Get all orders (GET)
export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie);
    if (!session)
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    if (session && session.role === RoleTypeEnum.RESTAURANT_OWNER)
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const orders = await Order.find({ user: session.userId }).populate("items.foodItem");
    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching orders" }, { status: 500 });
  }
}
