import express from "express";
import { proxyRequest } from "../config/proxy.js";

const router = express.Router();
const ORDER_SERVICE = process.env.ORDER_SERVICE;

router.use("/", (req, res) => {
  proxyRequest(req, res, ORDER_SERVICE);
});

export default router;
