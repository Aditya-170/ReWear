// File: app/api/purchases/user/route.js

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import user_model from "@/model/user_model";
import purchaseItem_model from "@/model/purchaseItem_model";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { clerkUserId } = body;

    if (!clerkUserId) {
      return NextResponse.json({ error: "Missing clerkUserId" }, { status: 400 });
    }

    // Find MongoDB User using Clerk ID
    const dbUser = await user_model.findOne({ clerkUserId });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch all purchases for this user
    const purchases = await purchaseItem_model.find({ owner: dbUser._id })
      .populate("product") // Populate product details
      .sort({ purchaseDate: -1 });

    return NextResponse.json(purchases);
  } catch (err) {
    console.error("Error fetching purchases:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
