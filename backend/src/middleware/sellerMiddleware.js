function isSeller(req, res, next) {
  if (req.user.role !== "seller") {
    return res.status(403).json({ message: "Seller access only" });
  }
  next();
}

module.exports = { isSeller };