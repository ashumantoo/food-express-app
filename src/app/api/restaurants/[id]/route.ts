import { NextResponse } from 'next/server';
import { connectDB } from "@/utils/db";
import Restaurant, { IRestaurant } from '@/models/restaurant';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return NextResponse.json({ success: false, message: 'Restaurant not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: restaurant }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json() as IRestaurant;

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, body, { new: true });

    if (!updatedRestaurant) {
      return NextResponse.json({ success: false, message: 'Restaurant not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Restaurant updated successfully",
      data: updatedRestaurant
    }, {
      status: 200
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
