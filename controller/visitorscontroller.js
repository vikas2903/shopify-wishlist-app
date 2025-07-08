import Visitor from "../models/visitors.js";


// --------------------- Event endpoint ---------------------
export const trackingvisitors = async (req, res) => {
//   const { visitorId, eventType, details } = req.body;

//   let visitor = await Visitor.findOne({ visitorId });

//   if (!visitor) {
//     visitor = new Visitor({ visitorId });
//   }

//   // Increment page views
//   if (eventType === "page_view") {
//     visitor.pagesViewed += 1;
//   }

//   // Track product views
//   if (eventType === "product_view") {
//     const { productId, handle, title } = details;
//     let prodView = visitor.productViews.find(p => p.productId === productId);

//     if (prodView) {
//       prodView.count += 1;
//     } else {
//       visitor.productViews.push({ productId, handle, title, count: 1 });
//     }
//   }

//   // Track add to cart
//   if (eventType === "add_to_cart") {
//     visitor.addToCart.push({
//       variantId: details.variantId,
//       quantity: details.quantity,
//       productId: details.productId,
//       handle: details.handle,
//       title: details.title,
//       timestamp: new Date().toISOString(),
//     });
//   }

//   await visitor.save();
//   res.json({ message: "Event recorded", visitorId });



//  const { visitorId, shop, eventType, details } = req.body;

//   let visitor = await Visitor.findOne({ visitorId, shop });

//   if (!visitor) {
//     visitor = new Visitor({ visitorId, shop });
//   }

//   if (eventType === "page_view") visitor.pagesViewed += 1;

//   if (eventType === "product_view") {
//     const { productId, handle, title } = details;
//     let prodView = visitor.productViews.find(p => p.productId === productId);
//     if (prodView) {
//       prodView.count += 1;
//     } else {
//       visitor.productViews.push({ productId, handle, title, count: 1 });
//     }
//   }

//   if (eventType === "add_to_cart") {
//     visitor.addToCart.push({
//       variantId: details.variantId,
//       quantity: details.quantity,
//       productId: details.productId,
//       handle: details.handle,
//       title: details.title,
//       timestamp: new Date().toISOString(),
//     });
//   }

//   await visitor.save();
//   res.json({ message: "Event recorded", visitorId });


 const { visitorId, shop, eventType, details } = req.body;

  let visitor = await Visitor.findOne({ visitorId, shop });

  if (!visitor) {
    visitor = new Visitor({ visitorId, shop });
  }

  if (eventType === "page_view") {
    visitor.pagesViewed += 1;
  }

  if (eventType === "product_view") {
    const { handle, title } = details;
    let prodView = visitor.productViews.find(p => p.handle === handle);

    if (prodView) {
      prodView.count += 1;
    } else {
      visitor.productViews.push({ handle, title, count: 1 });
    }
  }

  if (eventType === "add_to_cart") {
    visitor.addToCart.push({
      variantId: details.variantId,
      quantity: details.quantity,
      handle: details.handle,
      title: details.title,
      timestamp: new Date().toISOString(),
    });
  }

  await visitor.save();
  res.json({ message: "Event recorded", visitorId });


};


export const visitoresdata = async (req, res) =>{
 try {
    const { shop, date } = req.query;

    if (!shop) {
      return res.status(400).json({ error: "Shop parameter is required" });
    }

    // Find all visitors for that shop
    let visitors = await Visitor.find({ shop });

    // If a date is provided, filter addToCart events inside each visitor
    if (date) {
      visitors = visitors.map(visitor => {
        const filteredAddToCart = visitor.addToCart.filter(event =>
          event.timestamp.startsWith(date)
        );

        return {
          ...visitor.toObject(),
          addToCart: filteredAddToCart,
        };
      });
    }

    res.json(visitors);
  } catch (error) {
    console.error("Error fetching visitors:", error);
    res.status(500).json({ error: "Server error" });
  }

}