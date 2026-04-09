import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center">
      <div className=" bg-gray-50 h-[300px] w-[320px] border border-pink-800 flex flex-col items-center justify-center gap-[20px] mt-[50px] rounded-[10px] ">
        <h2 className=" text-5xl text-pink-800">Welcome</h2>

        <button
          onClick={() => navigate("/signup")}
          className="text-pink-950 text-lg border border-pink-800 py-[8px] px-[35px] rounded-[8px] bg-pink-50 hover:bg-gray-200"
        >
          Sign Up
        </button>

        <button
          onClick={() => navigate("/login")}
          className="text-pink-950 text-lg border border-pink-800 py-[8px] px-[35px] rounded-[8px] bg-pink-50 hover:bg-gray-200"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Auth;
