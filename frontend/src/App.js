import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Auth from "./pages/auth";
import Signup from "./pages/Signup";
import Profile from "./pages/profile";
import Productdetails from "./pages/productdetails";
import Products from "./components/Products";
import CategoryProducts from "./pages/CategoryProducts";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import BrandProducts from "./pages/BrandProducts";
import MyOrders from "./pages/MyOrders";
import SearchResults from "./pages/searchResult";
import SellerDashboard from "./pages/SellerDashboard";
import BecomeSeller from "./pages/BecomeSeller";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <div className="sticky top-0 z-50 bg-white scrollbar-hide">
        <Header />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/category/:id" element={<CategoryProducts />} />
        <Route path="/product/:id" element={<Productdetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/brand/:brandId" element={<BrandProducts />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/become-seller" element={<BecomeSeller />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
