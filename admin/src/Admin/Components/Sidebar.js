import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [openCategory, setOpenCategory] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);
  const [openBanner, setOpenBanner] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/admin-login";
  };

  return (
    <div className=" bg-pink-100 text-pink-800 p-5">
      <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

      <ul className="space-y-4">
        <li>
          <div
            onClick={() => setOpenCategory(!openCategory)}
            className="cursor-pointer font-semibold"
          >
            Category ▼
          </div>

          {openCategory && (
            <ul className="ml-4 mt-2 space-y-2">
              <li>
                <Link to="/Add-Category">Add Category</Link>
              </li>
              <li>
                <Link to="/All-Category">All Category</Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <div
            onClick={() => setOpenProduct(!openProduct)}
            className="cursor-pointer font-semibold"
          >
            Product ▼
          </div>

          {openProduct && (
            <ul className="ml-4 mt-2 space-y-2">
              <li>
                <Link to="/add-product">Add Product</Link>
              </li>
              <li>
                <Link to="/all-product">All Product</Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <div
            onClick={() => setOpenBrand(!openBrand)}
            className="cursor-pointer font-semibold"
          >
            Brand ▼
          </div>

          {openBrand && (
            <ul className="ml-4 mt-2 space-y-2">
              <li>
                <Link to="/add-brand">Add Brand</Link>
              </li>
              <li>
                <Link to="/all-brand">All Brand</Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <div
            onClick={() => setOpenBanner(!openBanner)}
            className="cursor-pointer font-semibold "
          >
            Banner ▼
          </div>
          {openBanner && (
            <ul className="ml-4 mt-2 space-y-2">
              <li>
                <Link to="/add-banner">Add Banner</Link>
              </li>
              <li>
                <Link to="/all-banner">All Banner</Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <div
            onClick={() => setOpenOrder(!openOrder)}
            className="cursor-pointer font-semibold"
          >
            Orders ▼
          </div>

          {openOrder && (
            <ul className="ml-4 mt-2 space-y-2">
              <li>
                <Link to="/all-orders">All Orders</Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <button
            onClick={handleLogout}
            className="bg-red-400 text-white px-3 py-1 mt-5"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
