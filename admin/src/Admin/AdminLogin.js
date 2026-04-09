import { useState, useEffect } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/admin-login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Admin Login Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center bg-gray-100 h-screen">
      <div className=" bg-white border border-pink-800 w-[400px] h-[380px] shadow-md  flex flex-col items-center gap-[40px] rounded-[10px] mt-[50px]">
        <h2 className="text-3xl font-semibold text-pink-800 mt-[50px]">
          Admin Login
        </h2>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center gap-[20px]"
        >
          <input
            type="email"
            placeholder="Email"
            className="border border-pink-800 p-3 w-[360px] rounded-[10px] text-pink-800 bg-pink-50"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border border-pink-800 p-3 w-[360px] rounded-[10px] text-pink-800 bg-pink-50"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="border border-pink-800 px-6 py-3 rounded-[10px] text-pink-800 hover:bg-gray-200">
            Login
          </button>
          <div className="flex justify-end w-full pl-4 pt-3">
            <button
              onClick={() => {
                navigate("/admin-signup");
              }}
              className=" text-pink-800 "
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
