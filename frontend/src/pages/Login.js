import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/user/login", {
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
        <h1 className="text-5xl text-pink-800 font-semi-bold mb-[20px] ">LOGIN</h1>

        <input
          className="border border-pink-800 w-[350px] rounded-[8px] bg-pink-50"
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border border-pink-800 w-[350px] rounded-[8px] bg-pink-50  "
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} className="text-pink-950 text-lg border border-pink-800 py-[8px] px-[35px] rounded-[8px] bg-pink-50 hover:bg-gray-200">
          Login
        </button>
      </div>
    </section>
  );
};

export default Login;
