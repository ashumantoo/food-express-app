import { connectDB } from "@/utils/db";
import User, { IUser } from "@/models/user";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { createSession } from "@/utils/session";

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

    const _user = {
      id: user._id as string,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    };

    await createSession(_user.id, user.email, `${user.firstName} ${user.lastName}`, _user.role);

    const response = NextResponse.json({
      success: true,
      user: _user
    }, {
      status: 200
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
