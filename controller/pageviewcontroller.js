import Pageview from "../models/pageview.js";



export const trackPageView = async (req, res) => {
  const { productId, productHandle, shop } = req.body;
  try {
    const today = new Date().toISOString().split("T")[0];
  

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

export const deletePageView = async (req, res) => {
  const {shop, date } = req.query;

  if (!shop || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await Pageview.deleteOne({ shop, date });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Pageview not found" });
    }

    res.status(200).json({ message: "Pageview deleted successfully" });
  } catch (error) {
    console.error("Error deleting page view:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const deletePageViewsByShopAndDate = async (req, res) => {
  const { shop, date } = req.query;

  if (!shop || !date) {
    return res.status(400).json({ error: "Missing required query params: shop and date" });
  }

  try {
    const result = await Pageview.deleteMany({ shop, date });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No pageviews found for the given shop and date" });
    }

    res.status(200).json({
      message: "Pageviews deleted successfully",
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error("Error deleting pageviews:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// export const trackCheckoutClick = async (req, res) => {
//   const { productId, productHandle, shop } = req.body;
//   const date = new Date().toISOString().split("T")[0];

//   try {
//     const result = await Pageview.findOneAndUpdate(
//       { productId, shop, date },
//       {
//         $inc: { checkoutClicks: 1 },
//         $set: { productHandle }
//       },
//       { upsert: true, new: true }
//     );

//     return res.status(200).json({ message: "Checkout click tracked", data: result });
//   } catch (error) {
//     console.error("Error tracking Checkout click:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

export const trackAddtocartClick = async (req, res) => {
  const { productId, productHandle, shop } = req.body;
  const date = new Date().toISOString().split("T")[0];

  try {
    const result = await Pageview.findOneAndUpdate(
      { productId, shop, date },
      {
        $inc: { addToCartClicks: 1 },
        $set: { productHandle }
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({ message: "Checkout click tracked", data: result });
  } catch (error) {
    console.error("Error tracking Checkout click:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
 
 


// // Track Product Page View
// export const trackPageView = async (req, res) => {
//   const { productId, productHandle, shop } = req.body;
//   if (!productId || !productHandle || !shop) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   const date = new Date().toISOString().split("T")[0];

//   try {
//     const result = await Pageview.findOneAndUpdate(
//       { productId, shop, date },
//       { $inc: { views: 1 }, $set: { productHandle } },
//       { upsert: true, new: true }
//     );
//     return res.status(200).json({ message: "View tracked", data: result });
//   } catch (error) {
//     console.error("Error tracking page view:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

// Track Add to Cart Click
export const trackAddToCartClick = async (req, res) => {
  const { productId, productHandle, shop } = req.body;
  if (!productId || !productHandle || !shop) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const date = new Date().toISOString().split("T")[0];

  try {
    const result = await Pageview.findOneAndUpdate(
      { productId, shop, date },
      { $inc: { addToCartClicks: 1 }, $set: { productHandle } },
      { upsert: true, new: true }
    );
    return res.status(200).json({ message: "Add to Cart tracked", data: result });
  } catch (error) {
    console.error("Error tracking Add to Cart:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Track Checkout Click
export const trackCheckoutClick = async (req, res) => {
  const { productId, productHandle, shop } = req.body;
  if (!productId || !productHandle || !shop) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const date = new Date().toISOString().split("T")[0];

  try {
    const result = await Pageview.findOneAndUpdate(
      { productId, shop, date },
      { $inc: { checkoutClicks: 1 }, $set: { productHandle } },
      { upsert: true, new: true }
    );
    return res.status(200).json({ message: "Checkout click tracked", data: result });
  } catch (error) {
    console.error("Error tracking Checkout click:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get Page Views for Shop and Date
// export const getPageViews = async (req, res) => {
//   const { shop, date } = req.query;

//   if (!shop || !date) {
//     return res.status(400).json({ error: "Missing 'shop' or 'date' parameter" });
//   }

//   try {
//     const views = await Pageview.find({ shop, date }).sort({ views: -1 });
//     return res.status(200).json({
//       shop,
//       date,
//       total: views.length,
//       products: views
//     });
//   } catch (err) {
//     console.error("Error fetching views:", err);
//     return res.status(500).json({ error: "Server error" });
//   }
// };

// // Delete Single Page View
// export const deletePageView = async (req, res) => {
//   const { shop, date } = req.query;

//   if (!shop || !date) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     const result = await Pageview.deleteOne({ shop, date });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: "Pageview not found" });
//     }

//     return res.status(200).json({ message: "Pageview deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting page view:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Delete All Page Views for Shop and Date
// export const deletePageViewsByShopAndDate = async (req, res) => {
//   const { shop, date } = req.query;

//   if (!shop || !date) {
//     return res.status(400).json({ error: "Missing required query params: shop and date" });
//   }

//   try {
//     const result = await Pageview.deleteMany({ shop, date });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: "No pageviews found for the given shop and date" });
//     }

//     return res.status(200).json({
//       message: "Pageviews deleted successfully",
//       deletedCount: result.deletedCount
//     });
//   } catch (error) {
//     console.error("Error deleting pageviews:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };
