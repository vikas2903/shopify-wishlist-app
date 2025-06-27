import mongoose from "mongoose";

const PageviewSchema = new mongoose.Schema({
  productId: {
    type: String, // or Number if Shopify product IDs are numeric
    required: true,
  },
  productHandle: {
    type: String,
    required: true,
  },
  shop: {
    type: String,
    required: true,
  },
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,
  },
  views: {
    type: Number,
    default: 1,
  },
});

// Optional: prevent duplicates per product/shop/date
PageviewSchema.index({ productId: 1, shop: 1, date: 1 }, { unique: true });

export default mongoose.model("Pageview", PageviewSchema);
