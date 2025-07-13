import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import PurchaseItem from '@/model/purchaseItem_model';
import User from "@/model/user_model";
import Product from "@/model/product_model";

export async function GET() {
  try {
    await dbConnect();

    const purchases = await PurchaseItem.find({})
      .populate("buyer", "name email points label") 
      .populate("product", "title images category point")
      .sort({ createdAt: -1 }); 

    return NextResponse.json(purchases);
  } catch (error) {
    console.error("Error fetching purchases for admin:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
