require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URL);

  console.log("Connected to db");
}

module.exports = connectDB;
 