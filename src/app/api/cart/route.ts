import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Cart, { ICartItemModel } from "@/models/cart";

// 📌 GET: Retrieve cart for a specific user
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const userId = req.nextUrl.searchParams.get("user");

    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
    }

    const cart = await Cart.findOne({ user: userId }).populate("items.foodItem").populate("restaurant");
    if (!cart) {
      return NextResponse.json({ success: false, data: [], message: "Cart is empty" });
    }
    return NextResponse.json({ success: true, data: cart });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// 📌 POST: Add item to cart
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { user, restaurant, foodItem, quantity, price, isRemoving } = await req.json();

    let cart = await Cart.findOne({ user });
    if (!cart) {
      cart = new Cart({ user, restaurant, items: [], totalPrice: 0 });
    }

    const existingItem = cart.items.find((item: ICartItemModel) => item.foodItem.toString() === foodItem);

    if (existingItem) {
      existingItem.quantity = quantity;
    } else {
      cart.items.push({ foodItem, quantity });
    }
    if (isRemoving) {
      cart.totalPrice -= price;
    } else {
      cart.totalPrice += price;
    }
    await cart.save();

    return NextResponse.json({ success: true, data: cart }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// 📌 PUT: Update cart item quantity
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const { user, foodItem, quantity, price } = await req.json();

    let cart = await Cart.findOne({ user });
    if (!cart) return NextResponse.json({ success: false, message: "Cart not found" }, { status: 404 });

    const itemIndex = cart.items.findIndex((item: ICartItemModel) => item.foodItem.toString() === foodItem);
    if (itemIndex === -1) return NextResponse.json({ success: false, message: "Item not found in cart" }, { status: 404 });

    const oldQuantity = cart.items[itemIndex].quantity;
    cart.items[itemIndex].quantity = quantity;
    cart.totalPrice += (quantity - oldQuantity) * price;

    await cart.save();
    return NextResponse.json({ success: true, data: cart });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// 📌 DELETE: Remove item from cart
export async function DELETE(req: NextRequest) {
  await connectDB();
  const { user, foodItem, price, deleteCart } = await req.json();
  let cart = await Cart.findOne({ user });
  if (!cart) return NextResponse.json({ success: false, message: "Cart not found" }, { status: 404 });
  if (deleteCart) {
    await Cart.findOneAndDelete({ user });
    return NextResponse.json({ success: true, message: "Cart deleted successfully" });
  } else {
    cart.items = cart.items.filter((item: ICartItemModel) => item.foodItem.toString() !== foodItem);
    cart.totalPrice -= price;

    if (cart.items.length === 0) await Cart.findOneAndDelete({ user });
    else await cart.save();

    return NextResponse.json({ success: true, message: "Item removed", data: cart });
  }
}
