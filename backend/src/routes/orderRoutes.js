const express = require("express");
const orderController = require("../controllers/orderController");
const authmiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/create-order",
  authmiddleware.authuser,
  orderController.createOrder,
);

router.get(
  "/my-orders",
  authmiddleware.authuser,
  orderController.getUserOrders,
);

router.get(
  "/all-orders",
  authmiddleware.authuser,
  orderController.getAllOrders,
);

router.put(
  "/status/:id",
  authmiddleware.authuser,
  orderController.updateOrderStatus,
);

router.delete(
  "/delete/:id",
  authmiddleware.authuser,
  orderController.deleteOrder,
);

router.post(
  "/razorpay-order",
  authmiddleware.authuser,
  orderController.createRazorpayOrder,
);
router.post(
  "/verify-payment",
  authmiddleware.authuser,
  orderController.verifyPayment,
);

router.delete(
  "/delete/:id",
  authmiddleware.authuser,
  orderController.DeleteOrder,
);

router.put("/cancel/:id", authmiddleware.authuser, orderController.cancelOrder);

module.exports = router;
