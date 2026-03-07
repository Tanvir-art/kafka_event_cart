import express from "express";
import { proxyRequest } from "../config/proxy.js";

const router = express.Router();
const INVENTORY_SERVICE = process.env.INVENTORY_SERVICE;

router.use("/", (req, res) => {
  proxyRequest(req, res, INVENTORY_SERVICE);
});

export default router;
