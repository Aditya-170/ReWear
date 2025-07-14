import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/model/product_model";
export async function POST(req) {
  try {
    await dbConnect();
    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { status: "Sold" },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Product status updated to Sold",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product status:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
