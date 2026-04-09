import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const BecomeSeller = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shopName: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
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
    <div className="flex justify-center items-center mt-[100px]">
      <div className="border border-pink-800 p-6 rounded-[10px] w-[400px] flex flex-col items-center bg-gray-50 ">
        <h2 className="text-2xl text-pink-600 font-semibold mb-8 mt-6">Become a Seller</h2>

        <input
          type="text"
          name="shopName"
          placeholder="Shop Name"
          onChange={handleChange}
          className="border border-pink-800 bg-pink-100 text-pink-800 rounded w-full mb-3 p-2 "
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          className="border w-full bg-pink-100 border-pink-800 text-pink-800 rounded mb-3 p-2"
        />

        <textarea
          name="address"
          placeholder="Address"
          onChange={handleChange}
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
