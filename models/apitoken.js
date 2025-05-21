import mongoose from "mongoose";
const apitokenschema = new mongoose.Schema(
  {
    shop: {
      type: String,
      required: true,
      unique: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("apitoken", apitokenschema);
