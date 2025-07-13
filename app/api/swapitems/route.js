import dbConnect from "@/lib/db";
import SwapItem from "@/model/swapItem_model";
import Product from "@/model/product_model";
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
      owner1: userId,
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
      console.log("swap owener id", swap.owner2);
      const owner2User = await User.findOne({ clerkUserId: swap.owner2 })
        .select("name")
        .lean();
      console.log("owner to user", owner2User);
      results.push({
        _id: swap._id,
        status: swap.status,
        pointDifference: swap.pointDifference,
        swapDate: swap.swapDate,
        product1: {
          title: swap.product1?.title || "N/A",
          image: swap.product1?.images?.[0] || "",
        },
        product2: {
          title: swap.product2?.title || "N/A",
          image: swap.product2?.images?.[0] || "",
        },
        owner2Name: owner2User?.name || "Unknown",
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
