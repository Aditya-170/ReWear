import mongoose from "mongoose";

const swapItemSchema = new mongoose.Schema(
  {
    owner1: {
      type: String,
      ref: "User",
      required: true,
    },
    product1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    owner2: {
      type: String,
      ref: "User",
      required: true,
    },
    product2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    pointDifference: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "cancelled", "completed"],
      default: "pending",
    },
    swapDate: {
      type: Date,
      default: null, 
    },
  },
  { timestamps: true }
);

export default mongoose.models.SwapItem || mongoose.model("SwapItem", swapItemSchema);
