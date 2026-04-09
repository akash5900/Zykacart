import { useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";

function AdminSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    mobileNumber: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post("/user/admin-signup", form);
      alert("Admin Registered");
      navigate("/admin-login");
    } catch (error) {
      console.log(error);
      alert("Signup failed");
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 items-center h-screen">
      <div className=" bg-white border border-pink-800 w-[470px] h-[460px] flex flex-col items-center shadow-md gap-[40px] rounded-[10px] mt-[50px]">
        <h2 className="text-3xl font-semibold text-pink-800 mt-[50px]">Admin Signup</h2>
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
            name="email"
            placeholder="Email"
            className="border border-pink-800 p-2 w-[420px] rounded-[10px] text-pink-800 bg-pink-50"
            onChange={handleChange}
          />
          <input
            name="password"
            placeholder="Password"
            className="border border-pink-800 p-2 w-[420px] rounded-[10px] text-pink-800 bg-pink-50"
            onChange={handleChange}
          />
          <input
            name="mobileNumber"
            placeholder="Mobile"
            maxLength="10"
            className="border border-pink-800 p-2 w-[420px] rounded-[10px] text-pink-800 bg-pink-50"
            onChange={handleChange}
          />

          <button className="border border-pink-800 px-6 py-3 rounded-[10px] text-pink-800 hover:bg-gray-200">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminSignup;
