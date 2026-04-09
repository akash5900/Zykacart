const BannerModel = require("../models/Bannermodel");
const uploadFile = require("../services/storage.service");

async function createBanner(req, res) {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    const { title, subtitle, buttonText, buttonLink, position } = req.body;

    let imageUrl = "";
    if (req.file) {
      const result = await uploadFile(req.file.buffer);
      imageUrl = result.url;
    }

    const banner = await BannerModel.create({
      title,
      subtitle,
      buttonText,
      buttonLink,
      position,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Banner created",
      banner,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getBanner(req, res) {
  try {
    const banners = await BannerModel.find({
      position: req.params.position,
    }).sort({ createdAt: -1 });

    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllBanner(req, res) {
  try {
    const banners = await BannerModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, banners });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteBanner(req, res) {
  try {
    await BannerModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Banner deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateBanner(req, res) {
  try {
    const { title, subtitle, buttonText, buttonLink } = req.body;
    const bannerId = req.params.id;

    let updatedData = {
      title,
      subtitle,
      buttonText,
      buttonLink,
    };

    if (req.file) {
      const result = await uploadFile(req.file.buffer);
      updatedData.image = result.url;
    }

    const banner = await BannerModel.findByIdAndUpdate(bannerId, updatedData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Banner updated",
      banner,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createBanner,
  getAllBanner,
  deleteBanner,
  updateBanner,
  getBanner,
};
