import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: String,
  ownerId: { type: String, required: true },
  description: String,
  category: String,
  type: String,
  size: String,
  point: Number,
  condition: String,
  tags: String,
  images: [String],
  status: { type: String, default: 'Available' },

  createdAt: { type: Date, default: Date.now }

});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
