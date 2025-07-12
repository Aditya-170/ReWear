// POST: Create user with actual data if doesn't exist
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import user_model from "@/model/user_model";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { clerkUserId, name, email, number } = body;

    if (!clerkUserId || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let user = await user_model.findOne({ clerkUserId });

    if (!user) {
      user = new user_model({
        clerkUserId,
        name,
        email,
        number: number || null,
        points: 0,
        numberOfSwaps: 0,
        label: "Regular",
      });

      await user.save();
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error("POST /api/profile error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
