// File: app/api/notifications/accept/route.js

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import notification_model from "@/model/notification_model";
import swapItem_model from "@/model/swapItem_model";

export async function POST(req) {
  try {
    await dbConnect();
    const { notificationId, swapId } = await req.json();

    if (!notificationId || !swapId) {
      return NextResponse.json({ error: "Missing notificationId or swapId" }, { status: 400 });
    }

    // Update Notification
    await notification_model.findByIdAndUpdate(notificationId, {
      isRead: true,
      status: "accepted",
    });

    // Update SwapItem
    await swapItem_model.findByIdAndUpdate(swapId, {
      status: "accepted",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("ACCEPT ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
