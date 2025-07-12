import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true, // maps to Clerk's user ID
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    number: {
      type: String,
      required: false,
    },
    points: {
      type: Number,
      default: 0,
    },
    numberOfSwaps: {
      type: Number,
      default: 0,
    },
    memberSince: {
      type: Date,
      default: Date.now,
    },
    label: {
      type: String,
      enum: ["Regular", "Silver", "Gold", "Platinum"],
      default: "Regular",
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
