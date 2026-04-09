const express = require("express");
const sellerController = require("../controllers/sellerProductController");
const authmiddleware = require("../middleware/authMiddleware");
const { isSeller } = require("../middleware/sellerMiddleware");

const router = express.Router();

router.post(
  "/add",
  authmiddleware.authuser,
  isSeller,
  sellerController.addProduct,
);
router.get(
  "/my-products",
  authmiddleware.authuser,
  isSeller,
  sellerController.getSellerProducts,
);
router.put(
  "/update/:id",
  authmiddleware.authuser,
  isSeller,
  sellerController.updateProduct,
);
router.delete(
  "/delete/:id",
  authmiddleware.authuser,
  isSeller,
  sellerController.deleteProduct,
);

module.exports = router;
