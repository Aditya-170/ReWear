// File: app/api/notifications/unread-count/route.js

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import user_model from "@/model/user_model";
import notification_model from "@/model/notification_model";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { clerkUserId } = body;

    if (!clerkUserId) {
      return NextResponse.json({ error: "Missing clerkUserId" }, { status: 400 });
    }

    const user = await user_model.findOne({ clerkUserId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const count = await notification_model.countDocuments({
      user: user._id,
      isRead: false,
    });

    return NextResponse.json({ count });
  } catch (err) {
    console.error("UNREAD NOTIFICATIONS ERROR", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
