import { connectDB } from "@/utils/db";
import Invoice, { IInvoice, IInvoiceItem } from '@/models/invoice';
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/utils/session";
import { RoleTypeEnum } from "@/utils/const";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const orderId = searchParams.get('orderId');
  await connectDB();
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie);
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  if (session && session.role === RoleTypeEnum.RESTAURANT_OWNER) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  try {
    let query: any = { user: session?.userId };
    if (orderId) {
      query = { user: session?.userId, order: orderId }
    }
    const invoices = await Invoice.find(query).populate('order').populate('restaurant').populate('user');
    return NextResponse.json({ success: true, data: invoices });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching invoices" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectDB();
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie);
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  if (session && session.role === RoleTypeEnum.RESTAURANT_OWNER) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json() as IInvoice;
    const invoiceData = { ...body }
    const newINvoice = new Invoice(invoiceData);
    const _newInvoice = await newINvoice.save();
    return NextResponse.json({
      success: true,
      message: "Invoice created successfully",
      data: _newInvoice
    }, {
      status: 201
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}