import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/product/all")
      .then((res) => {
        console.log("DATA:", res.data);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className=" py-6 px-3 md:py-8 md:px-10 lg:px-20 ">
      <div className="flex justify-between">
        <h1 className="text-sm md:text-2xl text-pink-600 font-bold mb-5">
          Products For You
        </h1>
      </div>

      <div className=" grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 md:gap-6 lg:gap-10 ">
        {products.map((product) => (
          <div key={product._id} className="border p-3 bg-gray-50 rounded">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 md:h-40 object-cover"
            />

            <h2 className="text-sm md:text-lg text-pink-800 font-semibold mt-2">
              {product.name}
            </h2>

            <p className="text-gray-600">₹{product.price}</p>

            <Link
              to={`/product/${product._id}`}
              className="bg-pink-500 text-white px-3 py-1 mt-2 inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
