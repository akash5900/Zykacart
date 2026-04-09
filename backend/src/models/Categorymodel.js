const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({

    name: String,
    image: String,

}) ;

const CategoryModel = new mongoose.model("category", CategorySchema);

module.exports = CategoryModel;