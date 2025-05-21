import axios from "axios";
import Apitoken from "../models/apitoken.js";

export const redirectToShopify = async (req, res) => {
  const { shop } = req.query;

  if (!shop) return res.status(400).send("Missing shop parameter");

  const redirectUri = "https://shopify-app-7spy.onrender.com/auth/callback";
  const installUrl = `https://${shop}.myshopify.com/admin/oauth/authorize?client_id=7e14cea35d331d8a859a3d97b6b76175&scope=read_products,write_customers&redirect_uri=${redirectUri}&state=123&grant_options[]=per-user`;

  res.redirect(installUrl);
};

// https://ravistore-shop.myshopify.com/admin/oauth/authorize?client_id=7e14cea35d331d8a859a3d97b6b76175&scope=write_products,write_customers,read_products,read_orders,read_discounts&redirect_uri=https://investigators-robert-frozen-sustainable.trycloudflare.com/auth/callback&state=123


export const handleCallback = async (req, res) => {
  const { shop, code } = req.body;

  if (!shop || !code) {
    return res.status(400).json({ message: "Missing shop or code" });
  }

  const tokenUrl = `https://${shop}/admin/oauth/access_token`;
  const payload = {
    client_id: process.env.SHOPIFY_API_KEY,
    client_secret: process.env.SHOPIFY_API_SECRET,
    code,
  };

  try {
    const response = await axios.post(tokenUrl, payload);
    const accessToken = response.data.access_token;

    await Apitoken.findOneAndUpdate(
      { shop },
      { accessToken },
      { upsert: true, new: true }
    );

    const redirectURL = `https://admin.shopify.com/store/${shop.replace(".myshopify.com","")}/apps/${process.env.SHOPIFY_APP_HANDLE}`;

    return res.json({ success: true, redirectUrl: redirectURL });
  } catch (error) {
    console.error(
      "Token fetch failed:",
      error?.response?.data || error.message
    );
    return res.status(500).json({ message: "Error getting access token" });
  }
};
 