import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  storeDomain: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  productHandle: {
    type: [String], 
    required: true,
  },
}, { timestamps: true });


export default mongoose.model('Wishlist', wishlistSchema);