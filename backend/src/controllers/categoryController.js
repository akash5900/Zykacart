const CategoryModel = require("../models/Categorymodel");
const uploadfile = require("../services/storage.service");

async function createCategory(req, res) {
  try {
    const { name } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const result = await uploadfile(req.file.buffer);

    const alreadyExists = await CategoryModel.findOne({
      name,
    });

    if (alreadyExists) {
      return res.status(400).json({
        message: " Category already exists ",
      });
    }

    const category = await CategoryModel.create({
      name,
      image: result.url,
    });

    res.status(201).json({
      message: " Category created successfully ",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getCategory(req, res) {
  try {
    const category = await CategoryModel.find();

    res.status(200).json({
      message: "Category fetched successfully",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      message: "get error",
    });
  }
}

async function deleteCategory(req, res) {
  try {
    const { id } = req.params;

    await CategoryModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Delete error" });
  }
}

async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    let updateData = { name };

    if (req.file) {
      const result = await uploadfile(req.file.buffer);
      updateData.image = result.url;
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json({
      message: " Category updated successfully ",
      updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Update error" });
  }
}

async function getSingleCategory(req, res) {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category" });
  }
}

module.exports = { createCategory, getCategory, deleteCategory, updateCategory, getSingleCategory };
