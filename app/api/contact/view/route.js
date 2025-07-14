import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Contact from "@/model/contact_model";

export async function GET() {
  try {
    await dbConnect();

    const contacts = await Contact.find().sort({ createdAt: -1 });

    return NextResponse.json({ contacts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { message: "Failed to fetch contacts." },
      { status: 500 }
    );
  }
}
