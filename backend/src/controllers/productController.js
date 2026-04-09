const productModel = require("../models/Productmodel");
const userModel = require("../models/Usermodel");
const uploadFile = require("../services/storage.service");

async function createProducts(req, res) {
  try {
    const { name, description, price, category, brand = "product" } = req.body;

    const isAlreadyexists = await productModel.findOne({
      $or: [{ name }],
    });

    if (isAlreadyexists) {
      return res.status(400).json({
        message: "Product Alredy Exists",
      });
    }

    let imageUrl = "";

    if (req.file) {
      const result = await uploadFile(req.file.buffer);
      imageUrl = result.url;
    }

    const product = await productModel.create({
      name,
      description,
      price,
      category,
      brand,
      image: imageUrl,
      seller: req.user?.role === "seller" ? req.user._id : null,
    });

    res.status(201).json({
      message: " product created successfully",
      product,
    });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
}

async function getProductsByBrand(req, res) {
  try {
    const products = await productModel
      .find({ brand: req.params.brandId })
      .populate("brand")
      .populate("category");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await productModel
      .find()
      .populate("category")
      .populate("brand");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function getSingleProduct(req, res) {
  try {
    const product = await productModel
      .findById(req.params.id)
      .populate("category")
      .populate("brand")
      .populate("seller", "name email");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function updateProduct(req, res) {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Not found" });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    let imageUrl = product.image;

    if (req.file) {
      const result = await uploadFile(req.file.buffer);
      imageUrl = result.url;
    }

    const updated = await productModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: imageUrl },
      { new: true },
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Not found" });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await product.deleteOne();

    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function getProductsByCategory(req, res) {
  try {
    const products = await productModel
      .find({ category: req.params.categoryId })
      .populate("category");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function searchProducts(req, res) {
  try {
    const query = req.query.q;

    const products = await productModel
      .find({
        name: { $regex: query, $options: "i" },
      })
      .populate("category")
      .populate("brand");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getSellerProducts(req, res) {
  try {
    const sellerId = req.user._id;

    const products = await productModel
      .find({ seller: req.user._id })
      .populate("seller", "username email")
      .populate("category")
      .populate("brand");

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

async function adminUpdateProduct(req, res) {
  let imageUrl = "";

  if (req.file) {
    const result = await uploadFile(req.file.buffer);
    imageUrl = result.url;
  }

  const updatedData = { ...req.body };

  if (imageUrl) {
    updatedData.image = imageUrl;
  }

  const product = await productModel.findByIdAndUpdate(
    req.params.id,
    updatedData,
    { new: true },
  );

  res.json(product);
}

async function adminDeleteProduct(req, res) {
  await productModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted by admin" });
}

module.exports = {
  createProducts,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsByBrand,
  searchProducts,
  getSellerProducts,
  adminUpdateProduct,
  adminDeleteProduct,
};
