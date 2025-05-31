
import express from "express";

import  { getDashboardData }  from "../controller/dashboardController.js";
const dashboardroute = express.Router();

dashboardroute.post("/dashboard", getDashboardData);


export default dashboardroute;
