import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Order from "@/models/order";

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
    const orders = await Order.find().populate("items.foodItem");
    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching orders" }, { status: 500 });
  }
}
