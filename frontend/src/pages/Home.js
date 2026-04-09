import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Banner from "../components/Banner";
import Features from "../components/Features";
import Category from "../components/Category";
import Banner2 from "../components/Banner2";
import Brands from "../components/Brands";
import Topbrands from "../components/TopBrands";
import Products from "../components/Products";
import Footer from "../components/Footer";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#products-section") {
      const el = document.getElementById("products-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="block">
      <Banner />
      <div className="hidden md:block">
        <Features />
      </div>
      <Category />
      <div className="hidden md:block">
        <Banner2 />
      </div>
      <Brands />
      <Topbrands />
      <div id="products-section">
        <Products />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
