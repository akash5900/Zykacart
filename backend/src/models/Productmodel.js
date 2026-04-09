const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }
});

const productModel = new mongoose.model("product", productSchema);

module.exports = productModel;
