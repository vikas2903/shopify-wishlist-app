// import Wishlist from '../models/wishlistschema.js';

// export const wishlistCreate = async (req, res) => {
//   try {
//     const wishlistData = new Wishlist(req.body);
//     const { customerId, productHandle } = wishlistData;

//     // Check if this customer already saved this product
//     const existingEntry = await Wishlist.findOne({ customerId, productHandle });
//     if (existingEntry) {
//       return res.status(400).json({ message: "This product is already in the wishlist" });
//     }

//     const savedWishlist = await wishlistData.save();
//     console.log("Wishlist Saved:", savedWishlist);
//     res.status(200).json(savedWishlist);

//   } catch (error) {
//     console.error("Error saving wishlist item:", error);
//     res.status(500).json({ error: 'Error saving wishlist item1.' });
//   }
// };


import Wishlist from '../models/wishlistschema.js';

export const wishlistCreate = async (req, res) => {
  try {
    const { storeDomain, customerId, email, productHandle } = req.body;

    let wishlist = await Wishlist.findOne({ storeDomain, customerId });

    if (wishlist) {
      // Merge product handles without duplicates
      const newHandles = Array.isArray(productHandle) ? productHandle : [productHandle];
      const uniqueHandles = Array.from(new Set([...wishlist.productHandle, ...newHandles]));

      wishlist.productHandle = uniqueHandles;
      await wishlist.save();

      return res.status(200).json({ message: "Wishlist updated", wishlist });
    }

    // No existing wishlist, create a new one
    const newWishlist = new Wishlist({
      storeDomain,
      customerId,
      email,
      productHandle: Array.isArray(productHandle) ? productHandle : [productHandle],
    });

    await newWishlist.save();
    res.status(201).json({ message: "Wishlist created", wishlist: newWishlist });

  } catch (error) {
    console.error("Error saving wishlist item:", error);
    res.status(500).json({ error: "Server error" });
  }
};


export const wishlistget = async (req, res) =>{

  try{
    
    const {customerId, email} = req.body;

    if(!customerId || !email){
      return res.status(400).json({success: false,Error:" Please signup your email id not matched with your records :) "})
    }

    const data = await  Wishlist.find({customerId, email});
     return res.status(200).json({success: true, wishlist: data});
    

  }catch(error){
    return res.status(500).json({ success: false, message: "Server error" });
  }

}
 


