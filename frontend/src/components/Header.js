import "./Header.css";
import image from "../assests/categories/Logoo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  let timeout;

  const handleSearch = (value) => {
    setQuery(value);

    clearTimeout(timeout);

    timeout = setTimeout(async () => {
      if (value.length > 1) {
        try {
          const res = await API.get(`/product/search?q=${value}`);
          setSuggestions(res.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);
  };

  const handleProfileClick = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth");
      return;
    }

    try {
      await API.get("/user/profile");
      navigate("/profile");
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/auth");
    }
  };

  return (
    <header className=" border-b flex h-[80px] md:h-20 ">
      <div className=" flex items-center justify-between px-4 md:px-4 py-4 gap-4 md:gap-10 ">
        <button
          className="md:hidden text-xl cursor-pointer hover:text-pink-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <img
          src={image}
          alt=""
          className=" h-[90px] md:h-[175px] object-contain pt-2 md:pt-4 "
        />

        <div className="relative hidden md:block">
          <input
            className="border border-black rounded px-4 py-2 w-[575px]"
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate("/search?q=" + query);
                setSuggestions([]);
              }
            }}
          />

          {suggestions.length > 0 && (
            <div className="absolute bg-white border w-[575px] z-50 max-h-[300px] overflow-y-auto">
              {suggestions.map((p) => (
                <div
                  key={p._id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    navigate("/product/" + p._id);
                    setQuery("");
                    setSuggestions([]);
                  }}
                >
                  <img
                    src={p.image}
                    className="w-10 h-10 object-cover"
                    alt=""
                  />
                  <span>{p.name}</span>
                </div>
              ))}
            </div>
          )}
          {query.length > 1 && suggestions.length === 0 && (
            <div className="absolute bg-white border w-[575px] p-2 text-red-500">
              Product not found
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm ">
          <h3
            className="cursor-pointer hover:text-pink-600"
            onClick={() => {
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
                navigate("/seller-dashboard");
              } else if (user?.role === "admin") {
                alert("Admin cannot become seller");
              }
            }}
          >
            Become a <br /> Seller
          </h3>
          <div className="h-8 w-px bg-gray-300"></div>

          <h3
            className="cursor-pointer hover:text-pink-600"
            onClick={() => navigate("/about")}
          >
            About
          </h3>
          <div className="h-8 w-px bg-gray-300"></div>

          <h3
            className="cursor-pointer hover:text-pink-600 "
            onClick={handleProfileClick}
          >
            Profile
          </h3>
          <h3
            onClick={() => {
              if (!localStorage.getItem("token")) {
                navigate("/auth");
              } else {
                navigate("/cart");
              }
            }}
            className="cursor-pointer hover:text-pink-600 "
          >
            Cart
          </h3>
        </div>
      </div>

      <div className="px-4 flex items-center md:hidden relative">
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded w-full px-4 py-1"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />

        {/* Mobile Suggestions */}
        {suggestions.length > 0 && (
          <div className="absolute bg-white border w-full top-[45px] z-50">
            {suggestions.map((p) => (
              <div
                key={p._id}
                className="flex items-center gap-3 p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  navigate("/product/" + p._id);
                  setQuery("");
                  setSuggestions([]);
                }}
              >
                <img src={p.image} className="w-10 h-10 object-cover" alt="" />
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        )}

        {query.length > 1 && suggestions.length === 0 && (
          <div className="absolute bg-white border w-full top-[45px] p-2 text-red-500">
            Product not found
          </div>
        )}
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col justify-center text-[10px] text-pink-800 ">
          <h3 className="cursor-pointer hover:text-pink-600" onClick={() => {
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
                navigate("/seller-dashboard");
              } else if (user?.role === "admin") {
                alert("Admin cannot become seller");
              }
            }}>
            Become a Seller
          </h3>
          <h3
            onClick={() => navigate("/about")}
            className="cursor-pointer hover:text-pink-600"
          >
            About
          </h3>
          <h3
            onClick={handleProfileClick}
            className="cursor-pointer hover:text-pink-600"
          >
            Profile
          </h3>
          <h3
            onClick={() => {
              if (!localStorage.getItem("token")) {
                navigate("/auth");
              } else {
                navigate("/cart");
              }
            }}
            className="cursor-pointer hover:text-pink-600"
          >
            Cart
          </h3>
        </div>
      )}
    </header>
  );
};

export default Header;
