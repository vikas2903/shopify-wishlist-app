import express from "express";
import {
  storeSession,
  getSessionById,
} from "../controller/checkoutsessioncontroller.js";
const checkoutsessionroute = express.Router();

checkoutsessionroute.post("/checkout-session-set", storeSession);
checkoutsessionroute.get("/checkout-session-get/:sessionId", getSessionById);

export default checkoutsessionroute;
