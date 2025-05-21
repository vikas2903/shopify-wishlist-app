import axios from "axios";
import Apitoken from "../models/apitoken.js"; 

export const redirectToShopify = async (req, res) => {
  const { shop } = req.query;

  if (!shop) return res.status(400).send("Missing shop parameter");

  const redirectUri = "https://shopify-app-7spy.onrender.com/auth/callback";
  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=write_products,write_customers,read_products,read_orders,read_discounts&redirect_uri=${redirectUri}`;

  res.redirect(installUrl);
};

export const handleCallback = async (req, res) => {
  const { shop, code } = req.query;

  if (!shop || !code) return res.status(400).send("Missing shop or code");

  const tokenUrl = `https://${shop}/admin/oauth/access_token`;
  const payload = {
    client_id: process.env.SHOPIFY_API_KEY,
    client_secret: process.env.SHOPIFY_API_SECRET,
    code,
  };

  try {
    const response = await axios.post(tokenUrl, payload);
    const accessToken = response.data.access_token;

    // Save to MongoDB
    await Apitoken.findOneAndUpdate(
      { shop },
      { accessToken },
      { upsert: true, new: true }
    );

    // Redirect to Shopify Admin embedded app dashboard
    const redirectURL = `https://admin.shopify.com/store/${shop.replace(".myshopify.com", "")}/apps/${process.env.SHOPIFY_APP_HANDLE}`;
    res.redirect(redirectURL);

  } catch (error) {
    console.error("Token fetch failed:", error?.response?.data || error.message);
    res.status(500).send("Error getting access token");
  }
};
