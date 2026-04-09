const express = require("express");
const { authuser } = require("../middleware/authMiddleware");
const cartController = require("../controllers/cartController");

const router = express.Router();

router.post("/add", authuser, cartController.addToCart);
router.get("/my", authuser, cartController.getCart);
router.delete("/remove/:id", authuser, cartController.removeFromCart);

module.exports = router;
