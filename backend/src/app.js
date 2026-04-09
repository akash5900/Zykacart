const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");

const userrouter = require("./routes/userRoutes");
const productrouter = require("./routes/productRoutes");
const orderrouter = require("./routes/orderRoutes");
const categoryrouter = require("./routes/categoryRoutes");
const brandrouter = require("./routes/brandRoutes");
const bannerrouter = require("./routes/bannerRoutes");
const cartrouter = require("./routes/cartRoutes");
const sellerrouter = require("./routes/sellerRoutes");

const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:3001"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use("/api/user", userrouter);
app.use("/api/product", productrouter);
app.use("/api/order", orderrouter);
app.use("/api/category", categoryrouter);
app.use("/api/brand", brandrouter);
app.use("/api/banner", bannerrouter);
app.use("/api/cart", cartrouter);
app.use("/api/seller", sellerrouter); 
module.exports = app;
