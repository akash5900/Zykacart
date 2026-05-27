import { useEffect, useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [randomProducts, setRandomProducts] = useState([]);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    API.get(`/product/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        const res = await API.get("/product/random");
        setRandomProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRandomProducts();
  }, []);

  useEffect(() => {
    if (product?.variants?.length > 0) {
      const first = product.variants[0];

      setSelectedSize(first.size);
      setSelectedColor(first.color);
    }
  }, [product]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImage(product.images[0]);
    } else if (product?.image) {
      setMainImage(product.image);
    }
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="p-10 text-center text-pink-600 text-xl">
        Loading product...
      </div>
    );
  }

  const sizes = [...new Set(product.variants?.map((v) => v.size))];
  const colors = [...new Set(product.variants?.map((v) => v.color))];

  // ✅ selected variant
  const selectedVariant = product.variants?.find(
    (v) => v.size === selectedSize && v.color === selectedColor,
  );

  const displayPrice =
    selectedVariant?.price || product.variants?.[0]?.price || product.price;

  const addToCart = async () => {
    try {
      if (product.variants?.length > 0 && !selectedVariant) {
        alert("Please select size & color");
        return;
      }

      await API.post("/cart/add", {
        productId: product._id,
        quantity: 1,
        size: selectedVariant?.size,
        color: selectedVariant?.color,
        price: selectedVariant?.price,
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
        size: selectedVariant?.size,
        color: selectedVariant?.color,
        price: selectedVariant?.price,
      },
    });
  };

  return (
    <div className="p-4 md:px-16">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            {(product.images?.length > 0
              ? product.images
              : [product.image]
            ).map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className={`w-16 h-16 object-cover border cursor-pointer ${
                  mainImage === img ? "border-pink-600" : ""
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>

          <div>
            <img
              src={mainImage}
              alt=""
              className="w-[350px] md:w-[450px] md:h-[500px] object-cover border"
            />
          </div>
        </div>

        <div>
          <h1 className="text-l md:text-xl font-semi-bold ">
            {product.description}
          </h1>

          <p className="text-xl text-pink-700 mt-2">₹{displayPrice}</p>

          <p className="text-sm text-gray-600 mt-2">Inclusive of all taxes</p>

          {sizes.length > 0 && (
            <div className="mt-5">
              <h3 className="font-semibold">Size</h3>
              <div className="flex gap-2 mt-2">
                {sizes.map((size, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border ${
                      selectedSize === size ? "bg-pink-600 text-white" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {colors.length > 0 && (
            <div className="mt-5">
              <h3 className="font-semibold">Color</h3>
              <div className="flex gap-2 mt-2">
                {colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1 border ${
                      selectedColor === color ? "bg-pink-600 text-white" : ""
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          <ul className="mt-5 text-sm text-gray-700 space-y-1">
            <li>✔ Free Delivery</li>
            <li>✔ Secure Payment</li>
          </ul>

          <div className="mt-6 flex gap-3">
            <button
              onClick={addToCart}
              className="bg-pink-600 text-white px-6 py-2 w-full"
            >
              Add to Cart
            </button>

            <button
              onClick={buyNow}
              className="bg-pink-600 text-white px-6 py-2 w-full"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-xl md:text-2xl font-bold text-pink-600 mb-5">
          You May Also Like
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {randomProducts.map((p) => (
            <div
              key={p._id}
              className="border p-3 bg-white rounded hover:shadow-md transition cursor-pointer"
              onClick={() => navigate(`/product/${p._id}`)}
            >
              <img
                src={p.images?.[0] || p.image}
                alt=""
                className="w-full h-32 md:h-40 object-cover"
              />

              <h3 className="text-sm md:text-base font-semibold mt-2 text-gray-800">
                {p.name}
              </h3>

              <p className="text-pink-600 font-semibold mt-1">
                ₹{p.variants?.[0]?.price || p.price}
              </p>

              <button className="mt-2 text-xs md:text-sm bg-pink-500 text-white px-3 py-1 w-full">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
