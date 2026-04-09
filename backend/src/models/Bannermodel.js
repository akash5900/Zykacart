const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    buttonText: String,
    buttonLink: String,
    image: String,
    position: String,
  },
  { timestamps: true }
);

const BannerModel = mongoose.model("Banner", bannerSchema);

module.exports = BannerModel;