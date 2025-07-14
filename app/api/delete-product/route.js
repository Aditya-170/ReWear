import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/model/product_model";

export async function DELETE(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json({ message: "Product ID missing" }, { status: 400 });
    }

    const deleted = await Product.findByIdAndDelete(productId);

    if (!deleted) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
