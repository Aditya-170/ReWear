// File: app/api/products/user/route.js

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import product_model from "@/model/product_model";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { clerkUserId } = body;

    if (!clerkUserId) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const products = await product_model.find({ ownerId: clerkUserId }).sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (err) {
    console.error("Error fetching user's products:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
