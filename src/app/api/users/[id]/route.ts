import { NextResponse } from 'next/server';
import { connectDB } from "@/utils/db";
import User, { IUserModel } from '@/models/user';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ success: false, message: 'user not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json() as IUserModel;

    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });

    if (!updatedUser) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser
    }, {
      status: 200
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
