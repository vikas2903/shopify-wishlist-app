import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  shop: { type: String, required: true },
  discountApplied: { type: Boolean, default: false },
  status: { type: Number, default: 0 }, 
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Session", sessionSchema);
