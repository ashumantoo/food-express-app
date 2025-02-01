import { connectDB } from "@/utils/db";
import User, { IUser } from "@/models/user";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  try {
    const { firstName, lastName, mobile, role, email, password } = await req.json() as IUser;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, mobile, role, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ success: true, message: "User created successfully" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
