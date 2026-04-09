import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const buyNowItem = location.state;

  useEffect(() => {
    if (buyNowItem) {
      setCart([
        {
          product: buyNowItem.product,
          quantity: buyNowItem.quantity,
        },
      ]);
    } else {
      API.get("/cart/my").then((res) => setCart(res.data));
    }
  }, [navigate, buyNowItem]);

  const total = cart.reduce((sum, item) => {
    if (!item.product) return sum;
    return sum + item.product.price * item.quantity;
  }, 0);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const payNow = async () => {
    if (!validateAddress()) return;
    try {
      const { data } = await API.post("/order/razorpay-order", {
        amount: total,
      });

      const options = {
        key: "rzp_test_SZ1T7sxr03zhYK",
        amount: data.amount,
        currency: "INR",
        order_id: data.id,

        handler: async function (response) {
          console.log("PAYMENT SUCCESS:", response);

          const products = cart
            .filter((item) => item.product)
            .map((item) => ({
              product: item.product._id,
              quantity: item.quantity,
              price: item.product.price,
            }));

          await API.post("/order/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            products,
            totalAmount: total,
            address,
          });

          alert("Payment successful");
          navigate("/my-orders");
        },

        modal: {
          ondismiss: function () {
            alert("Payment popup closed");
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.log("PAYMENT FAILED:", response.error);
        alert("Payment Failed: " + response.error.description);
      });

      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  const placeOrderCOD = async () => {
    if (!validateAddress()) return;
    try {
      const products = cart
        .filter((item) => item.product)
        .map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
        }));

      await API.post("/order/create-order", {
        products,
        totalAmount: total,
        address,
        paymentMethod: "COD",
      });

      alert("Order placed successfully");
      navigate("/my-orders");
    } catch (error) {
      console.log(error);
    }
  };

  const validateAddress = () => {
    const { fullName, mobile, pincode, city, state, country } = address;

    if (!fullName || !mobile || !pincode || !city || !state || !country) {
      alert("Please fill all address fields");
      return false;
    }

    if (mobile.length !== 10) {
      alert("Enter valid mobile number");
      return false;
    }

    if (pincode.length !== 6) {
      alert("Enter valid pincode");
      return false;
    }

    return true;
  };

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-xl md:text-2xl text-pink-600 font-bold mb-5">Checkout</h1>

      <h2 className=" text-lg md:text-xl text-pink-900 mb-3">Total: ₹{total}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          className="border border-pink-800 w-full md:w-auto text-pink-800 p-2 rounded"
        />
        <input
          name="mobile"
          placeholder="Mobile"
          onChange={handleChange}
          className="border p-2 border-pink-800 w-full md:w-auto text-pink-800 rounded"
        />
        <input
          name="pincode"
          placeholder="Pincode"
          onChange={handleChange} 
          className="border p-2 border-pink-800 w-full md:w-auto text-pink-800 rounded"
        />
        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
          className="border p-2 border-pink-800 w-full md:w-auto text-pink-800 rounded"
        />
        <input
          name="state"
          placeholder="State"
          onChange={handleChange} 
          className="border p-2 border-pink-800 w-full md:w-auto text-pink-800 rounded"
        />
        <input
          name="country"
          placeholder="Country"
          onChange={handleChange}
          className="border p-2 border-pink-800 w-full md:w-auto text-pink-800 rounded"
        />
      </div>

      <button
        onClick={placeOrderCOD}
        className="bg-pink-800 text-white w-full md:w-auto px-6 py-2 mt-5 md:mr-3"
      >
        Cash on Delivery
      </button>

      <button
        onClick={payNow}
        className="bg-green-600 text-white w-full md:w-auto px-6 py-2 mt-3 md:mt-5"
      >
        Pay Online
      </button>
    </div>
  );
}

export default Checkout;
