import express from "express";
import { getDashboardData } from "../controller/dashboardController.js";

const dashboardroute = express.Router();

// Change from POST to GET since we're fetching data
dashboardroute.get("/dashboard", getDashboardData);

export default dashboardroute;
