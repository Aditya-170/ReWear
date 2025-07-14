// File: app/api/products/featured/route.js

import dbConnect from "@/lib/db";
import Product from "@/model/product_model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({ status: "Available" })
      .sort({ createdAt: -1 })
      .limit(8);

    return NextResponse.json(products);
  } catch (err) {
    console.error("Error fetching featured products:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
