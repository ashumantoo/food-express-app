import { NextResponse } from 'next/server';
import { connectDB } from "@/utils/db";
import Restaurant, { IRestaurantModel } from '@/models/restaurant';
import Menu from '@/models/menu';
import { cookies } from 'next/headers';
import { decrypt } from '@/utils/session';
import { RoleTypeEnum } from '@/utils/const';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return NextResponse.json({ success: false, message: 'Restaurant not found' }, { status: 404 });
    }

    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie);
    let menus = [];
    if (!session || session?.role !== RoleTypeEnum.RESTAURANT_OWNER) {
      menus = await Menu.find({ restaurantId: restaurant._id });
    }

    return NextResponse.json({ success: true, data: { restaurant, menus } }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json() as IRestaurantModel;

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
