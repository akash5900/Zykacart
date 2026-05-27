import { useEffect, useState, useRef } from "react";
import API from "../api";
import { useNavigate, useLocation } from "react-router-dom";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

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

  const [useSaved, setUseSaved] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const buyNowItem = location.state;

  const autocompleteRef = useRef();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDmd9BlEBu_b3mEsLzWKfIZpl8dY1HhzKk",
    libraries: ["places"],
  });

  useEffect(() => {
    if (buyNowItem) {
      setCart([
        {
          product: buyNowItem.product,
          quantity: buyNowItem.quantity,
          size: buyNowItem.size,
          color: buyNowItem.color,
          price: buyNowItem.price,
        },
      ]);
    } else {
      API.get("/cart/my").then((res) => setCart(res.data));
    }
  }, [buyNowItem]);

  useEffect(() => {
    API.get("/user/address")
      .then((res) => {
        if (res.data.address) {
          setAddress(res.data.address);
          setUseSaved(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const total = cart.reduce((sum, item) => {
    if (!item.product) return sum;

    const price =
      item.price ||
      item?.product?.variants?.find(
        (v) => v.size === item.size && v.color === item.color,
      )?.price ||
      item?.product?.variants?.[0]?.price ||
      item?.product?.price ||
      0;

    return sum + price * item.quantity;
  }, 0);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();

    if (!place || !place.address_components) {
      alert("Select address from suggestions");
      return;
    }

    let city = "";
    let state = "";
    let country = "";
    let pincode = "";

    place.address_components.forEach((comp) => {
      const types = comp.types;

      if (types.includes("locality")) city = comp.long_name;
      if (types.includes("administrative_area_level_1")) state = comp.long_name;
      if (types.includes("country")) country = comp.long_name;
      if (types.includes("postal_code")) pincode = comp.long_name;
    });

    setAddress((prev) => ({
      ...prev,
      city,
      state,
      country,
      pincode,
    }));
  };

  const validateAddress = () => {
    const { fullName, mobile, pincode, city, state, country } = address;

    if (!fullName || !mobile || !pincode || !city || !state || !country) {
      alert("Fill all fields");
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert("Invalid mobile");
      return false;
    }

    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      alert("Invalid pincode");
      return false;
    }

    return true;
  };

  const payNow = async () => {
    if (!validateAddress()) return;

    try {
      await API.post("/user/address", address);

      const { data } = await API.post("/order/razorpay-order", {
        amount: total,
      });

      const options = {
        key: "rzp_test_SZ1T7sxr03zhYK",
        amount: data.amount,
        currency: "INR",
        order_id: data.id,

        handler: async function (response) {
          const products = cart.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
            price:
              item.price ||
              item?.product?.variants?.find(
                (v) => v.size === item.size && v.color === item.color,
              )?.price ||
              item?.product?.variants?.[0]?.price ||
              item?.product?.price,
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
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.log(err);
    }
  };

  const placeOrderCOD = async () => {
    if (!validateAddress()) return;

    try {
      await API.post("/user/address", address);

      const products = cart.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price:
          item.price ||
          item?.product?.variants?.find(
            (v) => v.size === item.size && v.color === item.color,
          )?.price ||
          item?.product?.variants?.[0]?.price ||
          item?.product?.price,
      }));

      await API.post("/order/create-order", {
        products,
        totalAmount: total,
        address,
        paymentMethod: "COD",
      });

      alert("Order placed");
      navigate("/my-orders");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 md:px-16">
      <h1 className="text-2xl text-pink-600 font-bold mb-4">Checkout</h1>
      <h2 className="text-lg mb-4">Total: ₹{total}</h2>

      {useSaved && address.city && (
        <div className="border p-4 mb-4 bg-green-50 rounded">
          <h3 className="font-bold text-green-700">Saved Address</h3>
          <p>{address.fullName}</p>
          <p>{address.mobile}</p>
          <p>
            {address.city}, {address.state}, {address.country} -{" "}
            {address.pincode}
          </p>

          <button
            onClick={() => {
              setUseSaved(false);
            }}
            className="text-blue-600 underline mt-2"
          >
            Change Address
          </button>
        </div>
      )}

      {!useSaved && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            className="border p-2"
          />

          <input
            name="mobile"
            placeholder="Mobile"
            onChange={handleChange}
            className="border p-2"
          />

          {isLoaded && (
            <Autocomplete
              onLoad={(ref) => (autocompleteRef.current = ref)}
              onPlaceChanged={onPlaceChanged}
            >
              <input
                placeholder="Search Address"
                className="border p-2 col-span-2"
              />
            </Autocomplete>
          )}

          <input value={address.pincode} readOnly className="border p-2" />
          <input value={address.city} readOnly className="border p-2" />
          <input value={address.state} readOnly className="border p-2" />
          <input value={address.country} readOnly className="border p-2" />
        </div>
      )}

      <button
        onClick={placeOrderCOD}
        className="bg-pink-600 text-white px-6 py-2 mt-5 mr-3"
      >
        Cash on Delivery
      </button>

      <button
        onClick={payNow}
        className="bg-green-600 text-white px-6 py-2 mt-5"
      >
        Pay Online
      </button>
    </div>
  );
}

export default Checkout;
