import { connectDB } from "@/utils/db";
import User, { IUserModel } from "@/models/user";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  try {
    const { firstName, lastName, mobile, role, email, password } = await req.json() as IUserModel;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, mobile, role, password: hashedPassword });
    const _newUser = await newUser.save();

    return NextResponse.json({ success: true, message: "User created successfully", data: _newUser }, { status: 201 });
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
