import { connectDB } from "@/utils/db";
import User, { IUser } from "@/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
  await connectDB();

  try {
    const { email, password } = await req.json();

    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found with this email" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: "Incorrect password" }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    }, {
      status: 200
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
