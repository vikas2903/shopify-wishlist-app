import mongoose from "mongoose";

const PageViewSchema = new mongoose.Schema({
  productid: String,
  producthandle: String,
  shop: String,
  date: { type: String },
  views: { type: Number, default: 1 },
});

PageViewSchema.index({ productId: 1, date: 1, shop: 1 }, { unique: true });

export default mongoose.model("Pageview", PageViewSchema);
