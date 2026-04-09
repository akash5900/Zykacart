import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getuser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("not token");
        navigate("/auth");
        return;
      }
      try {
        const res = await API.get("/user/profile");
        setUser(res.data.user);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/auth");
      }
    };

    getuser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const handleHome = () => {
    navigate("/");
    return;
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="border border-pink-800 bg-gray-50 p-6 rounded-[10px] w-[350px] shadow mt-[100px] ">
          <h2 className="text-2xl mb-4 text-center text-pink-600">
            My Profile
          </h2>

          {user ? (
            <>
              <p>
                <b>Username:</b> {user.username}
              </p>
              <p>
                <b>Email:</b> {user.email}
              </p>
              <p>
                <b>Mobile:</b> {user.mobileNumber}
              </p>

              <button
                onClick={handleLogout}
                className="mt-4 w-full bg-pink-600 text-white py-2 rounded"
              >
                Logout
              </button>
              <button
                onClick={() => navigate("/my-orders")}
                className="mt-4 w-full bg-pink-600 text-white py-2 rounded"
              >
                My Orders
              </button>
              <button
                onClick={handleHome}
                className="mt-4 w-full bg-pink-600 text-white py-2 rounded"
              >
                Home
              </button>
            </>
          ) : (
            <p className="text-pink-600">Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
