const ProductModel = require("../models/Productmodel");

const addProduct = async (req, res) => {
  try {
    const product = await ProductModel.create({
      ...req.body,
      sellerId: req.user._id,
    });

    res.status(201).json({ message: "Product added", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSellerProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({ sellerId: req.user._id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.status(200).json({ message: "Product updated", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (product.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addProduct,
  getSellerProducts,
  updateProduct,
  deleteProduct,
};
