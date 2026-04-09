const express = require("express");
const multer = require("multer");
const productController = require("../controllers/productController");
const upload = multer({ storage: multer.memoryStorage() });
const authmiddleware = require("../middleware/authMiddleware");
const sellermiddleware = require("../middleware/sellerMiddleware");
const auth = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

const router = express.Router();

router.post(
  "/create",
  upload.single("image"),
  productController.createProducts,
);

router.post(
  "/add",
  authmiddleware.authuser,
  sellermiddleware.isSeller,
  upload.single("image"),
  productController.createProducts,
);

router.get(
  "/my-products",
  authmiddleware.authuser,
  sellermiddleware.isSeller,
  productController.getSellerProducts,
);

router.get("/all", productController.getAllProducts);
router.get("/category/:categoryId", productController.getProductsByCategory);
router.get("/brand/:brandId", productController.getProductsByBrand);
router.get("/search", productController.searchProducts);
router.get("/:id", productController.getSingleProduct);

router.put(
  "/update/:id",
  authmiddleware.authuser,
  sellermiddleware.isSeller,
  upload.single("image"),
  productController.updateProduct,
);


router.delete(
  "/delete/:id",
  authmiddleware.authuser,
  sellermiddleware.isSeller,
  productController.deleteProduct,
);

router.put(
  "/admin/update/:id",
  auth.authuser,
  isAdmin,
  upload.single("image"),
  productController.adminUpdateProduct,
);

router.delete(
  "/admin/delete/:id",
  auth.authuser,
  isAdmin,
  productController.adminDeleteProduct,
);

module.exports = router;
