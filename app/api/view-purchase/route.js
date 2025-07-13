// app/api/purchased/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import PurchaseItem from '@/model/purchaseItem_model';
import Product from '@/model/product_model';

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ message: 'Missing userId' }, { status: 400 });
    }

    await dbConnect();

    const purchases = await PurchaseItem.find({ buyer: userId })
      .populate({
        path: 'product',
        select: 'title description category images',
      })
      .sort({ purchaseDate: -1 });

    const formatted = purchases.map((item) => ({
      _id: item._id,
      title: item.product?.title || 'N/A',
      description: item.product?.description || 'N/A',
      category: item.product?.category || 'N/A',
      images: item.product?.images || [],
      purchaseDate: item.purchaseDate,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Error fetching purchases:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
