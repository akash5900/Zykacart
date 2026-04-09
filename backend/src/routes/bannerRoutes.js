const express = require("express");
const BannerController = require("../controllers/bannerController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/create", upload.single("image"), BannerController.createBanner);
router.get("/all", BannerController.getAllBanner);
router.get("/position/:position", BannerController.getBanner);
router.put("/update/:id", upload.single("image"), BannerController.updateBanner);
router.delete("/delete/:id", BannerController.deleteBanner);

module.exports = router;