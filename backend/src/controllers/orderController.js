const orderModel = require("../models/Ordermodel");
const product = require("../models/Productmodel");
const userModel = require("../models/Usermodel");
const CartModel = require("../models/Cartmodel");
const Razorpay = require("razorpay");
const crypto = require("crypto");

async function createOrder(req, res) {
  try {
    const { products, totalAmount, address, paymentMethod } = req.body;

    const order = await orderModel.create({
      user: req.user._id,
      products,
      totalAmount,
      address,
      paymentMethod,
    });

    await CartModel.deleteMany({ user: req.user._id });

    res.status(201).json({
      success: true,
      message: "Order placed",
      order,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getUserOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ user: req.user._id })
      .populate("products.product");

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.orderStatus !== "Placed") {
      return res.status(400).json({
        message: "Order cannot be cancelled after shipping",
      });
    }

    order.orderStatus = "Cancelled";
    if (order.paymentMethod === "COD") {
      order.paymentStatus = "Cancelled";
    }
    await order.save();

    res.json({
      success: true,
      message: "Order cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const orders = await orderModel
      .find()
      .populate("user", "username email")
      .populate("products.product");

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await orderModel.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true },
    );

    res.json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    await orderModel.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // in paisa
      currency: "INR",
      receipt: "receipt_order_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      products,
      totalAmount,
      address,
    } = req.body;

    // Create signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Payment verified → create order in DB
      const order = await orderModel.create({
        user: req.user._id,
        products,
        totalAmount,
        address,
        paymentMethod: "Razorpay",
        paymentStatus: "Paid",
      });

      res.json({
        success: true,
        message: "Payment successful & Order created",
        order,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    console.log("VERIFY ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

const DeleteOrder = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.orderStatus !== "Cancelled") {
      return res.status(400).json({
        message: "Only cancelled orders can be deleted",
      });
    }

    await orderModel.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  createRazorpayOrder,
  verifyPayment,
  cancelOrder,
  DeleteOrder,
};
