import dbConnect from "../../../lib/db";
import Product from "../../../model/product_model";

export async function POST(req) {
  await dbConnect();

  try {
    const { userId } = await req.json();

    if (!userId) {
      return new Response(JSON.stringify({ message: "User ID is required" }), {
        status: 400,
      });
    }

    const userProducts = await Product.find({
      ownerId: userId,
      status: "Available",
    }).sort({ createdAt: -1 });
    //console.log("asa", userProducts);
    return new Response(JSON.stringify(userProducts), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error fetching user products",
        error: error.message,
      }),
      {
        status: 500,
      }
    );
  }
}
