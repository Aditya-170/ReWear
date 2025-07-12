import dbConnect from '../../../../lib/db.js';
import Product from '../../../../model/product_model.js';

export async function GET(req, { params }) {
  await dbConnect();
  const { productId } = params;
  if (!productId || productId === 'undefined') {
    return new Response(JSON.stringify({ error: 'Invalid product ID' }), { status: 400 });
  }
  const product = await Product.findById(productId);
  if (!product) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  }
  return new Response(JSON.stringify(product), { status: 200 });
} 