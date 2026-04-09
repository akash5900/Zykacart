const CartModel = require("../models/Cartmodel");  

async function addToCart(req, res) {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    const existing = await CartModel.findOne({
      user: userId,
      product: productId,
    });

    if (existing) {
      existing.quantity += quantity;
      await existing.save();
      return res.json({ message: "Cart updated", cart: existing });
    }

    const cart = await CartModel.create({
      user: userId,
      product: productId,
      quantity,
    });

    res.json({ message: "Added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getCart(req, res) {
  try {
    const cart = await CartModel.find({ user: req.user._id }).populate(
      "product",
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function removeFromCart(req, res) {
  try {
    await CartModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { addToCart, getCart, removeFromCart };
