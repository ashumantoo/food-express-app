import { NextResponse } from 'next/server';
import { connectDB } from "@/utils/db";
import Restaurant, { IRestaurant } from '@/models/restaurant';

export async function GET() {
  try {
    await connectDB();
    const restaurants = await Restaurant.find();
    return NextResponse.json({
      success: true,
      data: restaurants
    }, {
      status: 200
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json() as IRestaurant;
    const newRestaurant = new Restaurant(body);
    const _newRestaurant = await newRestaurant.save();
    return NextResponse.json({
      success: true,
      message: "Restaurant created successfully",
      data: _newRestaurant
    }, {
      status: 201
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
