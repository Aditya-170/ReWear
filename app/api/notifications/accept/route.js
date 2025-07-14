import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Notification from "@/model/notification_model";
import SwapItem from "@/model/swapItem_model";
import Product from "@/model/product_model";
import User from "@/model/user_model";

export async function POST(req) {
  try {
    await dbConnect();
    const { notificationId, swapId } = await req.json();

    if (!notificationId || !swapId) {
      return NextResponse.json({ error: "Missing notificationId or swapId" }, { status: 400 });
    }

    const swap = await SwapItem.findByIdAndUpdate(
      swapId,
      { status: "accepted" },
      { new: true }
    )
      .populate("product1")
      .populate("product2");

    if (!swap) return NextResponse.json({ error: "Swap not found" }, { status: 404 });

    // Update products as sold
    await Product.findByIdAndUpdate(swap.product1._id, { status: "sold" });
    await Product.findByIdAndUpdate(swap.product2._id, { status: "sold" });

    // Update existing notification
    await Notification.findByIdAndUpdate(notificationId, {
      status: "accepted",
      isRead: true,
    });

    // Notify second owner
    const secondUser = await User.findOne({ clerkUserId: swap.owner1 });
    if (secondUser) {
      await Notification.create({
        user: secondUser._id,
        swap: swap._id,
        message: `Your swap request for "${swap.product1.title}" has been accepted!`,
        status: "accepted",
      });
    }

    // ✅ Point Adjustment Logic
    const p1Points = swap.product1.point;
    const p2Points = swap.product2.point;
    const pointDiff = Math.abs(p1Points - p2Points);

    if (p1Points !== p2Points) {
      const userToRewardClerkId = p1Points > p2Points ? swap.owner1 : swap.owner2;

      const rewardUser = await User.findOne({ clerkUserId: userToRewardClerkId });
      if (rewardUser) {
        rewardUser.points += pointDiff;
        await rewardUser.save();
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("ACCEPT ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
