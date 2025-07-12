// File: app/api/notifications/route.js

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Notification from "@/model/notification_model";
import User from "@/model/user_model";

// POST: Fetch notifications for current user
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { clerkUserId } = body;

    if (!clerkUserId) {
      return NextResponse.json({ error: "Missing clerkUserId" }, { status: 400 });
    }

    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const notifications = await Notification.find({ user: user._id }).sort({ createdAt: -1 });

    return NextResponse.json(notifications);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
