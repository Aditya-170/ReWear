import dbConnect from '../../../lib/db';
import Product from '../../../model/product_model.js';

export async function GET(req) {
  await dbConnect();
  const products = await Product.find().sort({ createdAt: -1 });
  return new Response(JSON.stringify(products), { status: 200 });
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const product = await Product.create(body);
  return new Response(JSON.stringify(product), { status: 201 });
} 