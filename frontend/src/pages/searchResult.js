import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api";

function SearchResults() {
  const [products, setProducts] = useState([]);
  const query = new URLSearchParams(useLocation().search).get("q");
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) return;

    API.get(`/product/search?q=${query}`)
      .then((res) => {
        console.log("SEARCH DATA:", res.data);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, [query]);

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-5">
        Search Results for "{query}" ({products.length} items)
      </h1>

      {products.length === 0 && (
        <div className="text-center mt-10">
          <p className="text-red-500 text-xl">No products found</p>
          <button
            onClick={() => navigate("/")}
            className="mt-3 bg-pink-600 text-white px-4 py-2"
          >
            Continue Shopping
          </button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-5">
        {products.map((p) => {
          // ✅ SAFE PRICE
          const price = p?.variants?.[0]?.price || p?.price || 0;

          // ✅ SAFE IMAGE (MAIN FIX)
          let image = "https://via.placeholder.com/200";

          if (p.images && Array.isArray(p.images) && p.images.length > 0) {
            image = p.images[0];
          } else if (p.image && p.image !== "") {
            image = p.image;
          }

          return (
            <div key={p._id} className="border p-3">
              <img src={image} alt="" className="h-40 w-full object-cover" />

              <h2 className="text-pink-700 font-semibold">{p.name}</h2>

              <p>₹{price}</p>

              <button
                onClick={() => navigate("/product/" + p._id)}
                className="bg-pink-600 text-white px-3 py-1 mt-2"
              >
                View Details
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchResults;
