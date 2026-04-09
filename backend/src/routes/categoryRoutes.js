const express = require("express");
const multer = require("multer");
const CategoryController = require("../controllers/categoryController");
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post(
  "/categorys",
  upload.single("image"),
  CategoryController.createCategory,
);

router.get("/categorys", CategoryController.getCategory);

router.put(
  "/categorys/:id",
  upload.single("image"),
  CategoryController.updateCategory,
);

router.get("/categorys/:id", CategoryController.getSingleCategory);

router.delete("/categorys/:id", CategoryController.deleteCategory);

module.exports = router;
