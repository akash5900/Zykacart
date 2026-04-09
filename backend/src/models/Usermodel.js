const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },

    mobileNumber: {
      type: Number,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
    },

    sellerInfo: {
      shopName: String,
      phone: String,
      address: String,
    },

    profileImage: {
      type: String,
      default: "",
    },

    address: {
      street: String,
      city: String,
      state: String,
      pincode: Number,
      country: String,
    },

    isactive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
