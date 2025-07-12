// If not already created
import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: "User",
    required: true,
  },
  swap: {
    type:String,
    ref: "SwapItem",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "cancelled", "completed"],
    default: "pending",
  },
}, { timestamps: true });

export default mongoose.models.Notification || mongoose.model("Notification", notificationSchema);