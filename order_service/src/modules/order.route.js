const express = require("express");
const router = express.Router();
const { createOrderHandler } = require("./order.controller");

router.post("/", createOrderHandler);

module.exports = router;