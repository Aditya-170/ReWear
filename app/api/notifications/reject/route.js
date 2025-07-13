import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Notification from "@/model/notification_model";
import SwapItem from "@/model/swapItem_model";
import User from "@/model/user_model";

export async function POST(req) {
  try {
    await dbConnect();
    const { notificationId, swapId } = await req.json();

    if (!notificationId || !swapId) {
      return NextResponse.json({ error: "Missing notificationId or swapId" }, { status: 400 });
    }

    const swap = await SwapItem.findByIdAndUpdate(swapId, { status: "rejected" }, { new: true });

    if (!swap) return NextResponse.json({ error: "Swap not found" }, { status: 404 });

    // Update existing notification
    await Notification.findByIdAndUpdate(notificationId, {
      status: "rejected",
      isRead: true,
    });

    // Notify the user who initiated the request
    const initiator = await User.findOne({ clerkUserId: swap.owner1 });
    if (initiator) {
      await Notification.create({
        user: initiator._id,
        swap: swap._id,
        message: "Your swap request has been rejected.",
        status: "rejected",
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("REJECT ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
