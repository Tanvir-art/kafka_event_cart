import express from "express";
import { proxyRequest } from "../config/proxy.js";

const router = express.Router();
const PAYMENT_SERVICE = process.env.PAYMENT_SERVICE;

if (!PAYMENT_SERVICE) {
  console.error("Missing PAYMENT_SERVICE in environment variables");
}

router.use("/", (req, res) => {
  if (!PAYMENT_SERVICE) {
    return res.status(500).json({ message: "PAYMENT_SERVICE is not configured" });
  }

  proxyRequest(req, res, PAYMENT_SERVICE);
});

export default router;
