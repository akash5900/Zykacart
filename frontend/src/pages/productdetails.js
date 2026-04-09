import { useEffect, useState } from "react";
import API from "../api";
import { useParams } from "react-router-dom";
const { useNavigate } = require("react-router-dom");

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    API.get(`/product/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  const addToCart = async () => {
    try {
      await API.post("/cart/add", {
        productId: product._id,
        quantity: 1,
      });

      alert("Added to cart");
    } catch (error) {
      alert("Login required");
    }
  };

  const buyNow = () => {
    navigate("/checkout", {
      state: {
        product: product,
        quantity: 1,
      },
    });
  };

  return (
    <div className="p-4 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10">
      <img src={product.image} alt="" className="w-96" />

      <div>
        <h1 className=" text-xl md:text-3xl text-pink-800 font-bold">
          {product.name}
        </h1>
        <p className="text-lg md:text-xl text-pink-800 mt-2">₹{product.price}</p>
        <p className="mt-3 md:mt-4 text-sm md:text-base text-pink-800">{product.description}</p>

        <div className="flex flex-col gap-2">
          <button
            onClick={addToCart}
            className="bg-pink-600 text-white w-full md:w-auto px-5 py-2 mt-5"
          >
            Add to Cart
          </button>
          <button
            onClick={buyNow}
            className="bg-pink-600 text-white  w-full md:w-auto px-5 py-2 mt-5"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
