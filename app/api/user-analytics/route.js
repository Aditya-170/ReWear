import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/model/product_model";
import PurchaseItem from "@/model/purchaseItem_model";
import SwapItem from "@/model/swapItem_model";
import User from "@/model/user_model";

export async function POST(req) {
  await dbConnect();
  const { clerkUserId } = await req.json();

  const user = await User.findOne({ clerkUserId });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const uid = user._id;

  // Initialize analytics map
  const monthlyData = {};
  for (let i = 0; i < 12; i++) {
    const month = new Date(0, i).toLocaleString("default", { month: "short" });
    monthlyData[month] = { swaps: 0, purchases: 0, points: 0, listings: 0 };
  }

  const swaps = await SwapItem.find({ $or: [{ owner1: clerkUserId }, { owner2: clerkUserId }] });
  const purchases = await PurchaseItem.find({ buyer: uid }).populate("product");
  const listings = await Product.find({ ownerId: clerkUserId });

  swaps.forEach((s) => {
    const month = new Date(s.createdAt).toLocaleString("default", { month: "short" });
    monthlyData[month].swaps += 1;
  });

  purchases.forEach((p) => {
    const month = new Date(p.createdAt).toLocaleString("default", { month: "short" });
    monthlyData[month].purchases += 1;
    monthlyData[month].points += p.points;
  });

  listings.forEach((l) => {
    const month = new Date(l.createdAt).toLocaleString("default", { month: "short" });
    monthlyData[month].listings += 1;
  });

  const chartData = Object.keys(monthlyData).map((month) => ({
    month,
    ...monthlyData[month],
  }));

  return NextResponse.json(chartData);
}
