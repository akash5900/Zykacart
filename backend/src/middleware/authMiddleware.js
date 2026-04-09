const jwt = require("jsonwebtoken");
const userModel = require("../models/Usermodel");

async function authuser(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];;

    if (!token) {
      return res.status(401).json({
        message: "unauthorized token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User deleted" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ messgage: "unauthorized " });
  }
}

module.exports = { authuser };
