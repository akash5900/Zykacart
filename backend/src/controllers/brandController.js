const BrandModel = require("../models/Brandmodel");
const uploadFile = require("../services/storage.service");

async function createBrand(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Brand name is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Brand image is required" });
    }

    const result = await uploadFile(req.file.buffer);

    const brand = await BrandModel.create({
      name,
      image: result.url,
    });

    res.status(201).json({
      success: true,
      message: "Brand created successfully",
      brand,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getallBrands(req, res) {
  try {
    const brands = await BrandModel.find().sort({ createdAt: -1 });
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteBrand(req, res) {
  try {
    await BrandModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Brand deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateBrand(req, res) {
  try {
    const { name } = req.body;
    const brandId = req.params.id;

    let updatedData = { name };

    
    if (req.file) {
      const result = await uploadFile(req.file.buffer);
      updatedData.image = result.url;
    }

    const brand = await BrandModel.findByIdAndUpdate(brandId, updatedData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Brand updated",
      brand,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createBrand, getallBrands, deleteBrand, updateBrand };
