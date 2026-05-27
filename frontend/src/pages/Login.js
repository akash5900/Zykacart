import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://zykacart-xx7b.vercel.app/api/user/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className=" flex items-center justify-center  ">
      <div className=" mt-[100px] h-[350px] border border-black rounded-[10px] flex flex-col items-center justify-center gap-6 py-[10px] px-[20px] ">
        <h1 className="text-5xl text-pink-800 font-semi-bold mb-[20px] ">
          LOGIN
        </h1>

        <input
          className="border border-pink-800 w-[350px] rounded-[8px] bg-pink-50"
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative w-[350px]">
          <input
            className="border border-pink-800 w-[350px] rounded-[8px] bg-pink-50  "
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-4 cursor-pointer text-pink-800"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          onClick={handleLogin}
          className="text-pink-950 text-lg border border-pink-800 py-[8px] px-[35px] rounded-[8px] bg-pink-50 hover:bg-gray-200"
        >
          Login
        </button>
      </div>
    </section>
  );
};

export default Login;
