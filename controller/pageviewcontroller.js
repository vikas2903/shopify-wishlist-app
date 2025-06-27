
import Pageview from '../models/pageview.js';

export const trackPageView = async (req, res) =>{

    const { productid, producthandle, shop, } = req.body;
    
    console.log("Received data:", req.body);
    res.json({ message: "Data received successfully", productid, producthandle, shop });

}


