import { useState, useRef } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

const BecomeSeller = () => {
  const navigate = useNavigate();
  const autocompleteRef = useRef();

  const [formData, setFormData] = useState({
    shopName: "",
    phone: "",
    address: "",
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDmd9BlEBu_b3mEsLzWKfIZpl8dY1HhzKk",
    libraries: ["places"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();

    if (!place || !place.formatted_address) return;

    setFormData((prev) => ({
      ...prev,
      address: place.formatted_address,
    }));
  };

  const validateForm = () => {
    const { shopName, phone, address } = formData;

    if (!shopName || !phone || !address) {
      alert("Please fill all fields");
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("Enter valid 10-digit mobile number");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const res = await API.put("/user/become-seller", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("You are now a seller 🚀");

      navigate("/seller-dashboard");
    } catch (error) {
      alert("Error becoming seller");
    }
  };

  return (
    <div className="flex justify-center items-center mt-[80px] md:mt-[100px]">
      <div className="border border-pink-800 p-4 md:p-6 rounded-[10px] w-[335px] md:w-[400px] flex flex-col items-center bg-gray-50 ">
        <h2 className="text-lg md:text-2xl text-pink-600 font-semibold mb-8 mt-6">
          Become a Seller
        </h2>

        <input
          type="text"
          name="shopName"
          placeholder="Business Name"
          onChange={handleChange}
          className="border border-pink-800 bg-pink-100 text-pink-800 rounded w-full mb-3 p-2 "
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          maxLength="10"
          className="border w-full bg-pink-100 border-pink-800 text-pink-800 rounded mb-3 p-2"
        />

        {isLoaded && (
          <Autocomplete
            onLoad={(ref) => (autocompleteRef.current = ref)}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              placeholder="Search Shop Address"
              className="border w-[320px] md:w-[350px] bg-pink-100 border-pink-800 text-pink-800 rounded mb-3 p-2"
            />
          </Autocomplete>
        )}

        <textarea
          value={formData.address}
          readOnly
          className="border w-full bg-pink-100 border-pink-800 text-pink-800 rounded mb-3 p-2"
        />

        <button
          onClick={handleSubmit}
          className="bg-pink-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default BecomeSeller;