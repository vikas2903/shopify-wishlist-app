import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import route from "./route/wishlistroute.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors()); 

const MONGODB_URI = process.env.MONGODB; 
const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
   
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");


    app.get("/wishlist", (req, res) => {
      res.status(200).json({ mongo: "connected" });
    });


    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Server startup error:", error.message);
  }
}


startServer();

app.use("/api/wishlist", route)
