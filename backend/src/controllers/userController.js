const userModel = require("../models/Usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { username, email, mobileNumber, password } = req.body;

  const isAlreadyexists = await userModel.findOne({
    $or: [{ email }],
  });

  if (isAlreadyexists) {
    return res.status(400).json({
      message: "User Alredy Exists",
    });
  }

  const HashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    mobileNumber,
    password: HashPassword,
    role: "buyer",
  });

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.status(201).json({
    message: "user created successfully",
    user: {
      username: user.username,
      email: user.email,
      mobileNumber: user.mobileNumber,
      role: user.role,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ email }],
  });

  if (!user) {
    return res.status(400).json({
      message: "invalid user",
    });
  }

  const ispasswordvalid = await bcrypt.compare(password, user.password);

  if (!ispasswordvalid) {
    return res.status(400).json({ message: "invalid password" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.status(201).json({
    message: "user login successfully",
    token,
    user: {
      username: user.username,
      email: user.email,
      mobileNumber: user.mobileNumber,
      role: user.role,
    },
  });
}

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await userModel.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const ispasswordvalid = await bcrypt.compare(password, admin.password);

    if (!ispasswordvalid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    if (admin.role !== "admin") {
      return res.status(403).json({ message: "Not an admin" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
    );

    res.json({
      message: "Admin login successful",
      token,
      user: admin,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const adminSignup = async (req, res) => {
  try {
    const { username, email, password, mobileNumber } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const HashPassword = await bcrypt.hash(password, 10);

    const admin = await userModel.create({
      username,
      email,
      password: HashPassword,
      mobileNumber,
      role: "admin",
    });

    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
    );

    res.json({
      message: "Admin registered successfully",
      token,
      user: admin,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function becomeSeller(req, res) {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "seller") {
      return res.status(400).json({ message: "Already a seller" });
    }

    user.role = "seller";

    user.sellerInfo = {
      shopName: req.body.shopName,
      phone: req.body.phone,
      address: req.body.address,
    };

    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
    );

    res.json({
      message: "You are now a seller",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
  adminLogin,
  adminSignup,
  becomeSeller,
};
