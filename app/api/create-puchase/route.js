import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import PurchaseItem from "@/model/purchaseItem_model";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, productId, points } = body;

    if (!userId || !productId ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await dbConnect();

    const newPurchase = new PurchaseItem({
      buyer: userId,
      product: productId,
      points,
      status: "Purchased",
      purchaseDate: new Date(),
    });

    await newPurchase.save();

    return NextResponse.json(
      { message: "Purchase saved successfully", purchase: newPurchase },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving purchase:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
