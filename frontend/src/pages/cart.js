import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCart([]);
      return;
    }

    try {
      const res = await API.get("/cart/my");
      setCart(res.data);
    } catch (error) {
      setCart([]);
    }
  };

  const removeItem = async (id) => {
    await API.delete("/cart/remove/" + id);
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cart.reduce((sum, item) => {
    const price = item?.product?.price || 0;
    const qty = item?.quantity || 0;
    return sum + price * qty;
  }, 0);

  return (
    <div className=" p-4 md:p-10">
      <h1 className="text-2xl text-pink-600 font-bold mb-5 ">My Cart</h1>

      {!localStorage.getItem("token") ? (
        <div>
          <p className="text-lg">Please login to view your cart</p>
          <button
            onClick={() => navigate("/auth")}
            className="bg-black text-white px-4 py-2 mt-3"
          >
            Login
          </button>
        </div>
      ) : cart.length === 0 ? (
        <p className="text-xl font-semibold text-pink-800 flex justify-center mt-[150px] ">
          Your Cart Is Empty
        </p>
      ) : (
        <>
          {cart.map((item) => {
            if (!item.product) return null;

            return (
              <div key={item._id} className="flex gap-5 border p-3 mb-3">
                <img
                  src={item.product.image}
                  alt=""
                  className="w-24 h-24 object-cover"
                />

                <div className="text-pink-800">
                  <h2>{item.product.name}</h2>
                  <p>₹{item.product.price}</p>
                  <p>Qty: {item.quantity}</p>

                  <button
                    onClick={() => navigate("/checkout")}
                    className="bg-pink-600 text-white px-5 py-2 mt-3"
                  >
                    Checkout
                  </button>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="bg-red-500 text-white px-3 py-1 mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}

          <h2 className="text-xl text-pink-600 font-bold mt-5">Total: ₹{total}</h2>
        </>
      )}
    </div>
  );
}

export default Cart;
