const express = require("express");
const {
  createOrder,
  getOrderById,
  getOrdersByUser,
  deleteOrder,
} = require("../controller/order.controller");

const router = express.Router();

// Route to create a new order
router.post("/orders", createOrder);

router.get("/orders/:orderId", getOrderById);

router.get("/user/:userId", getOrdersByUser);

router.delete("/orders/:orderId", deleteOrder);

module.exports = router;
