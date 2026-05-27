import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function CategoryProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://zykacart-xx7b.vercel.app/api/product/category/${id}`)
      .then((res) => {
        console.log("CATEGORY DATA:", res.data); // debug
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="py-6 px-3 md:px-10 lg:px-20">
      <h1 className="text-lg md:text-2xl text-pink-600 font-bold mb-5">
        Category Products
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-10">
        {products.map((product) => {
          // ✅ SAFE PRICE
          const price = product?.variants?.[0]?.price || product?.price || 0;

          // ✅ SAFE IMAGE (MAIN FIX)
          let image = "https://via.placeholder.com/200";

          if (
            product.images &&
            Array.isArray(product.images) &&
            product.images.length > 0
          ) {
            image = product.images[0];
          } else if (product.image && product.image !== "") {
            image = product.image;
          }

          return (
            <div key={product._id} className="border p-3 bg-gray-50 rounded">
              <img
                src={image}
                alt={product.name}
                className="w-full h-32 md:h-40 object-cover"
              />

              <h2 className="text-sm md:text-lg text-pink-800 font-semibold mt-2">
                {product.name}
              </h2>

              <p className="text-gray-600">₹{price}</p>

              <Link to={`/product/${product._id}`}>
                <button className="bg-pink-500 text-white w-full md:w-auto px-3 py-1 mt-2">
                  View Details
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryProducts;
