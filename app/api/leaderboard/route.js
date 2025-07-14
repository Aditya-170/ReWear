import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/model/user_model";

export async function GET() {
  try {
    await dbConnect();

    const topUsers = await User.find({})
      .sort({ numberOfSwaps: -1, memberSince: 1 }) // Descending swaps, ascending date
      .limit(3)
      .select("name numberOfSwaps memberSince");

    // Map and format response
    const formatted = topUsers.map((user, index) => ({
      name: user.name,
      swaps: user.numberOfSwaps,
      rank: index + 1,
      memberSince: user.memberSince,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Leaderboard fetch failed:", error);
    return NextResponse.json(
      { message: "Failed to fetch leaderboard data." },
      { status: 500 }
    );
  }
}