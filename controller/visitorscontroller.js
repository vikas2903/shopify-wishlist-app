import Visitor from "../models/visitors.js";


// --------------------- Event endpoint ---------------------
export const trackingvisitors = async (req, res) => {
  const { visitorId, eventType, details } = req.body;

  let visitor = await Visitor.findOne({ visitorId });

  if (!visitor) {
    visitor = new Visitor({ visitorId });
  }

  // Increment page views
  if (eventType === "page_view") {
    visitor.pagesViewed += 1;
  }

  // Track product views
  if (eventType === "product_view") {
    const { productId, handle, title } = details;
    let prodView = visitor.productViews.find(p => p.productId === productId);

    if (prodView) {
      prodView.count += 1;
    } else {
      visitor.productViews.push({ productId, handle, title, count: 1 });
    }
  }

  // Track add to cart
  if (eventType === "add_to_cart") {
    visitor.addToCart.push({
      variantId: details.variantId,
      quantity: details.quantity,
      productId: details.productId,
      handle: details.handle,
      title: details.title,
      timestamp: new Date().toISOString(),
    });
  }

  await visitor.save();
  res.json({ message: "Event recorded", visitorId });


};