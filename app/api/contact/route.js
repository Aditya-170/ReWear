import { NextResponse } from 'next/server';
import dbConnect from "@/lib/db";
import Contact from '@/model/contact_model';

export async function POST(req) {
  try {
    await dbConnect(); // Connect to MongoDB

    const { name, email, phone, title, description, clerkId } = await req.json();

    // Basic validation
    if (!name || !email || !title || !description || !clerkId) {
      return NextResponse.json(
        { message: "All fields except phone are required." },
        { status: 400 }
      );
    }

    const contactEntry = new Contact({
      name,
      email,
      phone,
      title,
      description,
      clerkId,
      status: 'Unread',
    });

    await contactEntry.save();

    return NextResponse.json(
      { message: "Contact request submitted successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json(
      { message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
