import dbConnect from "@/lib/db";
import SwapItem from "@/model/swapItem_model";
import User from "@/model/user_model";

export async function GET() {
  try {
    await dbConnect();

    const swaps = await SwapItem.find()
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
      const [owner1User, owner2User] = await Promise.all([
        User.findOne({ clerkUserId: swap.owner1 }).select("name").lean(),
        User.findOne({ clerkUserId: swap.owner2 }).select("name").lean(),
      ]);

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
        owner1Name: owner1User?.name || "Unknown",
        owner2Name: owner2User?.name || "Unknown",
      });
    }

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch all swaps:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
