import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import product_model from "@/model/product_model";

export async function GET() {
  try {
    await connectDB();

    const products = await product_model.find({});

    const updatedPromises = products.map((product) => {
      const randomPoint = Math.floor(Math.random() * (150 - 40 + 1)) + 40;
      product.point = randomPoint;
      return product.save();
    });

    await Promise.all(updatedPromises);

    return NextResponse.json({ message: "Points updated for all products." });
  } catch (error) {
    console.error("Error updating product points:", error);
    return NextResponse.json(
      { message: "Failed to update points", error: error.message },
      { status: 500 }
    );
  }
}
