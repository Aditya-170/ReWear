import mongoose from "mongoose";

const purchaseItemSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Purchased",
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.PurchaseItem ||
  mongoose.model("PurchaseItem", purchaseItemSchema);
