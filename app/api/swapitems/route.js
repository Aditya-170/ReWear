import dbConnect from "@/lib/db";
import SwapItem from "@/model/swapItem_model";
import User from "@/model/user_model";

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return new Response(JSON.stringify({ message: "User ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await dbConnect();

    const swaps = await SwapItem.find({
      $or: [{ owner1: userId }, { owner2: userId }],
      status: "accepted",
    })
      .populate({
        path: "product1",
        select: "title images",
      })
      .populate({
        path: "product2",
        select: "title images",
      })
      .lean();

    const results = [];

    for (const swap of swaps) {
      const isOwner1 = swap.owner1 === userId;

      const myProduct = isOwner1 ? swap.product1 : swap.product2;
      const otherProduct = isOwner1 ? swap.product2 : swap.product1;

      const otherUserId = isOwner1 ? swap.owner2 : swap.owner1;

      const otherUser = await User.findOne({ clerkUserId: otherUserId })
        .select("name")
        .lean();

      results.push({
        _id: swap._id,
        status: swap.status,
        pointDifference: swap.pointDifference,
        swapDate: swap.swapDate,
        myProduct: {
          title: myProduct?.title || "N/A",
          image: myProduct?.images?.[0] || "",
        },
        otherProduct: {
          title: otherProduct?.title || "N/A",
          image: otherProduct?.images?.[0] || "",
        },
        otherUserName: otherUser?.name || "Unknown",
      });
    }

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch swaps:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
