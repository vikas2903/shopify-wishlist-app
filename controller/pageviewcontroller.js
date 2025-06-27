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

//   console.log("Received data:", req.body);
//   res.json({
//     message: "Data received successfully",
//     productId,
//     productHandle,
//     shop,
//   });
};



export const getPageViews = async (req, res) => {
   const { shop, date } = req.query;

  if (!shop || !date) {
    return res.status(400).json({ error: "Missing 'shop' or 'date' parameter" });
  }

  try {
    const views = await Pageview.find({ shop, date }).sort({ views: -1 });

    res.status(200).json({
      shop,
      date,
      total: views.length,
      products: views
    });
  } catch (err) {
    console.error('Error fetching views:', err);
    res.status(500).json({ error: 'Server error' });
  }
};