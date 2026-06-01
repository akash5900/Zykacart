import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSeller = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      alert("Please login first");
      navigate("/auth");
      return;
    }

    if (user?.role === "buyer") {
      navigate("/become-seller");
    } else if (user?.role === "seller") {
      navigate("/seller-dashboard");
    } else if (user?.role === "admin") {
      alert("Admin cannot become seller");
    }
  };

  const handleSeller2 = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (user?.role === "buyer") {
      navigate("/become-seller");
    } else if (user?.role === "seller") {
      navigate("/add-product");
    }
  };

  const handleSubscribe = () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Enter valid email");
      return;
    }

    alert("Subscribed successfully ✅");

    setEmail("");
  };

  return (
    <footer className="bg-gray-100 text-pink-900 mt-10">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo + About */}
        <div>
          <h2 className="text-xl font-bold text-pink-600 mb-3">Zykacart</h2>
          <p className="text-sm">
            Your one-stop multi-vendor shopping platform connecting buyers and
            sellers seamlessly.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-4">
            <span className="p-2 bg-white shadow rounded-full hover:bg-black hover:text-white transition duration-300 cursor-pointer">
              <FaFacebookF />
            </span>
            <span className="p-2 bg-white shadow rounded-full hover:bg-black hover:text-white transition duration-300 cursor-pointer">
              <FaInstagram />
            </span>
            <span className="p-2 bg-white shadow rounded-full hover:bg-black hover:text-white transition duration-300 cursor-pointer">
              <FaTwitter />
            </span>
            <span className="p-2 bg-white shadow rounded-full hover:bg-black hover:text-white transition duration-300 cursor-pointer">
              <FaLinkedin />
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-pink-600 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-pink-900 hover:pl-2 transition-all"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="hover:text-pink-900 hover:pl-2 transition-all"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="hover:text-pink-900 hover:pl-2 transition-all"
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                to="/my-orders"
                className="hover:text-pink-900 hover:pl-2 transition-all"
              >
                My Orders
              </Link>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="font-semibold text-pink-600 mb-3">Account</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/login"
                className="hover:text-pink-900 hover:pl-2 transition-all"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="hover:text-pink-900 hover:pl-2 transition-all"
              >
                Signup
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="hover:text-pink-900 hover:pl-2 transition-all"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/checkout"
                className="hover:text-pink-900 hover:pl-2 transition-all"
              >
                Checkout
              </Link>
            </li>
          </ul>
        </div>

        {/* Seller */}
        <div>
          {/* Seller Section */}
          <h3 className="font-semibold text-pink-600 mb-3">Seller</h3>
          <ul className="space-y-2 text-sm">
            <li
              onClick={handleSeller}
              className="cursor-pointer hover:text-pink-900 hover:pl-2 transition-all"
            >
              Become Seller
            </li>

            <li
              onClick={handleSeller}
              className="cursor-pointer hover:text-pink-900  hover:pl-2 transition-all"
            >
              Dashboard
            </li>

            <li
              onClick={handleSeller2}
              className="cursor-pointer hover:text-pink-900  hover:pl-2 transition-all"
            >
              Add Product
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-pink-800 py-6 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">Subscribe for latest updates</p>

        <div className="flex w-full md:w-auto">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded-l-md outline-none w-full md:w-64 text-sm md:text-lg"
          />
          <button
            onClick={handleSubscribe}
            className="bg-pink-600 text-white text-xs md:text-lg px-4 py-2 rounded-r-md hover:bg-gray-800 transition"
          >
            Subscribe
          </button>
        </div>
      </div>

      <div className="bg-gray-200 text-center py-4 text-sm">
        © 2026 Zykacart | Developed by Akashdeep Singh
      </div>
    </footer>
  );
};

export default Footer;
