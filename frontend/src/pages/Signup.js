import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobileNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/register",
        formData,
      );

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className=" flex items-center justify-center px-3 ">
      <div className=" border rounded-[10px] shadow-md border-black min-h-[470px] flex flex-col items-center justify-center gap-[20px] mt-[50px] px-4 md:px-[20px] py-[10px] ">
        <h2 className="text-4xl text-pink-800 font-bold">Signup</h2>

        <input
          className="border border-pink-800 w-[340px] md:w-[400px] rounded-[8px] bg-pink-50 px-3 py-2"
          type="text"
          name="username"
          placeholder="Enter Username"
          onChange={handleChange}
        />

        <input
          className="border border-pink-800  w-[340px] md:w-[400px] rounded-[8px] bg-pink-50 px-3 py-2"
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <input
          className="border border-pink-800  w-[340px] md:w-[400px] rounded-[8px] bg-pink-50 px-3 py-2"
          type="text"
          name="mobileNumber"
          placeholder="Enter Mobile Number"
          onChange={handleChange}
        />

        <input
          className="border border-pink-800  w-[340px] md:w-[400px] rounded-[8px] bg-pink-50 px-3 py-2"
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <button
          onClick={handleSignup}
          className="text-pink-950 text-lg border border-pink-800 py-[8px] px-[35px] rounded-[8px] bg-pink-50 hover:bg-gray-200"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
