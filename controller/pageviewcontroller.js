import Pageview from "../models/pageview.js";

export const trackPageView = async (req, res) => {
  const { productId, productHandle, shop } = req.body;
  try {
    const today = new Date().toISOString().split("T")[0];
    console.log("vikas", today);

    const result = await Pageview.findOneAndUpdate(
      {
        productId: productId,
        date: today,
        shop: shop,
      },
      { $inc: { views: 1 }, $set: { productHandle } },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "View tracked", data: result });
  } catch (error) {
    console.error("Error tracking page view:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

  console.log("Received data:", req.body);
  res.json({
    message: "Data received successfully",
    productId,
    producthandle,
    shop,
  });
};
