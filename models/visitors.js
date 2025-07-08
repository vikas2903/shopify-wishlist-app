// import mongoose from "mongoose";

// const productViewSchema = new mongoose.Schema({
//   productId: String,
//   handle: String,
//   title: String,
//   count: { type: Number, default: 1 }
// });

// const addToCartSchema = new mongoose.Schema({
//   variantId: String,
//   quantity: Number,
//   productId: String,
//   handle: String,
//   title: String,
//   timestamp: String
// });

// const visitorSchema = new mongoose.Schema({
//   visitorId: { type: String, unique: true },
//   pagesViewed: { type: Number, default: 0 },
//   productViews: [productViewSchema],
//   addToCart: [addToCartSchema],
// });

// export default mongoose.model("Visitor", visitorSchema);


import mongoose from "mongoose";

const productViewSchema = new mongoose.Schema({
  productId: String,
  handle: String,
  title: String,
  count: { type: Number, default: 1 }
});

const addToCartSchema = new mongoose.Schema({
  variantId: String,
  quantity: Number,
  productId: String,
  handle: String,
  title: String,
  timestamp: String
});

const visitorSchema = new mongoose.Schema({
  visitorId: { type: String, unique: false }, // Unique per shop+visitor
  shop: String,                               // ✅ New field to store Shopify shop domain
  pagesViewed: { type: Number, default: 0 },
  productViews: [productViewSchema],
  addToCart: [addToCartSchema],
});

export default mongoose.model("Visitor", visitorSchema);

