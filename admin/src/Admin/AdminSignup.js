import { useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AdminSignup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    mobileNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobileNumber") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { username, email, mobileNumber, password } = form;

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

  const handleSignup = async (e) => {
    e.preventDefault(); // 🔥 VERY IMPORTANT

    if (!validateForm()) return;

    try {
      await API.post("/user/admin-signup", form);
      alert("Admin Registered Successfully");
      navigate("/admin-login");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 items-center h-screen">
      <div className="bg-white border border-pink-800 w-[470px] h-[460px] flex flex-col items-center shadow-md gap-[40px] rounded-[10px] mt-[50px]">
        <h2 className="text-3xl font-semibold text-pink-800 mt-[50px]">
          Admin Signup
        </h2>

        <form
          onSubmit={handleSignup}
          className="flex flex-col items-center gap-[18px]"
        >
          <input
            name="username"
            placeholder="Username"
            className="border border-pink-800 p-2 w-[420px] rounded-[10px] text-pink-800 bg-pink-50"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-pink-800 p-2 w-[420px] rounded-[10px] text-pink-800 bg-pink-50"
            onChange={handleChange}
          />

          <input
            name="mobileNumber"
            type="tel"
            placeholder="Enter Mobile Number"
            className="border border-pink-800 p-2 w-[420px] rounded-[10px] text-pink-800 bg-pink-50"
            value={form.mobileNumber}
            onChange={handleChange}
            maxLength="10"
          />

          <div className="relative w-[420px]">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="border border-pink-800 p-2 w-[420px] rounded-[10px] text-pink-800 bg-pink-50"
              onChange={handleChange}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-4 cursor-pointer text-pink-800"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            className="border border-pink-800 px-6 py-3 rounded-[10px] text-pink-800 hover:bg-gray-200"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminSignup;
