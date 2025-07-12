import dbConnect from '../../../lib/db';
import User from '../../../model/user_model.js';

export async function GET() {
  await dbConnect();
  const users = await User.find().sort({ createdAt: -1 });
  return new Response(JSON.stringify(users), { status: 200 });
} 