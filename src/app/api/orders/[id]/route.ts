import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Order from "@/models/order";

// 📌 Get a single order by ID (GET)
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  try {
    const { id } = await params;
    const order = await Order.findById(id).populate("items.foodItem").populate('restaurant');
    if (!order) return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching order" }, { status: 500 });
  }
}

// 📌 Update order status (PUT)
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  try {
    const { id } = await params;
    const body = await req.json();
    const updatedOrder = await Order.findByIdAndUpdate(id, body, { new: true });
    if (!updatedOrder) return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: updatedOrder });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error updating order" }, { status: 500 });
  }
}

// 📌 Delete an order (DELETE)
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  try {
    const { id } = await params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error deleting order" }, { status: 500 });
  }
}
