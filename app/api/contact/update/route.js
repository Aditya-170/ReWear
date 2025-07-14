import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Contact from "@/model/contact_model";

export async function POST(req) {
  try {
    await dbConnect();
    const { contactId } = await req.json();

    if (!contactId) {
      return NextResponse.json(
        { message: "Contact ID is required" },
        { status: 400 }
      );
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { status: "Read" },
      { new: true }
    );

    if (!updatedContact) {
      return NextResponse.json(
        { message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Contact marked as read",
      contact: updatedContact,
    });
  } catch (error) {
    console.error("Error updating contact status:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
