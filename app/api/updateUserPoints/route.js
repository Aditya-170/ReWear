import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/model/user_model";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, pointsToDeduct } = body;

    if (!userId || typeof pointsToDeduct !== "number") {
      return NextResponse.json({ message: "Missing userId or pointsToDeduct" }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({ clerkUserId: userId });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.points < pointsToDeduct) {
      return NextResponse.json({ message: "Insufficient points" }, { status: 400 });
    }

    user.points -= pointsToDeduct;
    await user.save();

    return NextResponse.json({
      message: "Points deducted successfully",
      updatedPoints: user.points,
    });
  } catch (error) {
    console.error("Error deducting points:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
