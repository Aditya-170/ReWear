import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/model/user_model"; 

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { clerkUserId } = body;
   console.log("printning" , clerkUserId);
    if (!clerkUserId) {
      return NextResponse.json({ message: "clerkUserId is required" }, { status: 400 });
    }

    await dbConnect();

    const deletedUser = await User.findOneAndDelete({ clerkUserId });

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully", user: deletedUser }, { status: 200 });
  } catch (error) {
    console.error("Delete User Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
