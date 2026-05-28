import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobileNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobileNumber") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { username, email, mobileNumber, password } = formData;

    if (!username || !email || !mobileNumber || !password) {
      alert("Please fill all fields");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Enter valid email");
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      alert("Enter valid mobile number");
      return false;
    }

    if (/^(\d)\1{9}$/.test(mobileNumber)) {
      alert("Invalid mobile number");
      return false;
    }

    if (/^(\d)\1{1,}$/.test(mobileNumber.slice(1))) {
      alert("Invalid mobile number");
      return false;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(
        "https://zykacart-xx7b.vercel.app/api/user/register",
        formData,
      );

      alert("Signup successfully");

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className=" flex items-center justify-center px-3 ">
      <div className=" border rounded-[10px] shadow-md border-black min-h-[470px] w-[335px] md:w-[400px] flex flex-col items-center justify-center gap-[20px] mt-[50px] px-4 md:px-[20px] py-[10px] ">
        <h2 className="text-4xl text-pink-800 font-bold">Signup</h2>

        <input
          className="border border-pink-800 w-full rounded-[8px] bg-pink-50 px-3 py-2"
          type="text"
          name="username"
          placeholder="Enter Username"
          onChange={handleChange}
        />

        <input
          className="border border-pink-800 w-full rounded-[8px] bg-pink-50 px-3 py-2"
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <input
          className="border border-pink-800 w-full rounded-[8px] bg-pink-50 px-3 py-2"
          type="tel"
          name="mobileNumber"
          placeholder="Enter Mobile Number"
          value={formData.mobileNumber}
          onChange={handleChange}
          maxLength="10"
        />

        <div className="relative w-[330px] md:w-[400px] px-3 md:px-6">
          <input
            className="border border-pink-800 w-full rounded-[8px] bg-pink-50 px-3 py-2"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            maxLength="6"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 md:right-6 top-3 md:top-3 cursor-pointer text-pink-800"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

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
