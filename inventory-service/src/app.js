import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Inventory Service Running");
});

export default app;