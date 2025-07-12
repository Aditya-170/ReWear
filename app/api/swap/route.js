import dbConnect from '@/lib/db';
import Product from '@/model/product_model';
import Notification from '@/model/notification_model';
import user_model from '@/model/user_model';
import swapItem_model from '@/model/swapItem_model';

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { owner1, product1, owner2, product2, pointDifference } = body;

    if (!owner1 || !product1 || !owner2 || !product2) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const p1 = await Product.findById(product1);
    const p2 = await Product.findById(product2);

    if (!p1 || !p2) {
      return new Response(JSON.stringify({ message: 'One or both products not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create swap request
    const newSwap = await swapItem_model.create({
      owner1,
      product1,
      owner2,
      product2,
      pointDifference: pointDifference || 0,
      initiatedBy: owner1,
      status: "pending",
    });

    // 🔔 Create Notification for owner2
    const userToNotify = await user_model.findOne({ clerkUserId: owner2 });

    if (userToNotify) {
      await Notification.create({
        user: userToNotify._id,
        swap: newSwap._id,
        message: `You received a swap request for your item "${p2.title}".`,
        status: "pending",
      });
    }

    return new Response(JSON.stringify({ success: true, swap: newSwap }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('[SWAP_CREATE_ERROR]', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
