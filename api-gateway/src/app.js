import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import orderProxy from "./routes/order.proxy.js";
import paymentProxy from "./routes/payment.proxy.js";
import inventoryProxy from "./routes/inventory.proxy.js";

import { apiLimiter } from "./middleware/ratelimiter.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use(apiLimiter);

app.get("/", (req, res) => {
  res.send("API Gateway running");
});

app.use("/api/orders", orderProxy);
app.use("/api/payments", paymentProxy);
app.use("/api/inventory", inventoryProxy);

export default app;
