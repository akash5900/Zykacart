const express = require("express");
const multer = require("multer");
const BrandController = require("../controllers/brandController");
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/create", upload.single("image"), BrandController.createBrand);
router.get("/all", BrandController.getallBrands);
router.delete("/delete/:id", BrandController.deleteBrand);
router.put("/update/:id", upload.single("image"), BrandController.updateBrand);

module.exports = router;