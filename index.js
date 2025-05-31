import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import route from "./route/wishlistroute.js";
import apitokenroute from "./route/apitokenroute.js";
import dashboardroute from "./route/dashboardRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors({
  origin: "*", 
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));


const MONGODB_URI = process.env.MONGODB;
const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");

    // Register routes BEFORE listen()
    app.use("/api/wishlist", route);


    app.use("/api", apitokenroute)
    app.use("/api", dashboardroute);

    // Test connection route
    app.get("/wishlist", (req, res) => {
      res.status(200).json({ mongo: "connected" });
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error.message);
  }
}
startServer();
