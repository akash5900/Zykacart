import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { useRef } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  const [showForm, setShowForm] = useState(false);
  const [savedAddress, setSavedAddress] = useState(null);

  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });

  const navigate = useNavigate();

  const autocompleteRef = useRef();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDmd9BlEBu_b3mEsLzWKfIZpl8dY1HhzKk",
    libraries: ["places"],
  });

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();

    if (!place || !place.address_components) return;

    let city = "";
    let state = "";
    let country = "";
    let pincode = "";

    place.address_components.forEach((comp) => {
      const types = comp.types;

      if (types.includes("locality")) city = comp.long_name;
      if (types.includes("administrative_area_level_1")) state = comp.long_name;
      if (types.includes("country")) country = comp.long_name;
      if (types.includes("postal_code")) pincode = comp.long_name;
    });

    setAddress((prev) => ({
      ...prev,
      city,
      state,
      country,
      pincode,
    }));
  };

  useEffect(() => {
    const getuser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/auth");
        return;
      }

      try {
        const res = await API.get("/user/profile");
        setUser(res.data.user);

        const addr = await API.get("/user/address");
        if (addr.data.address) {
          setSavedAddress(addr.data.address);
        }
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
  };

  const validateAddress = () => {
    const { fullName, mobile, pincode, city, state, country } = address;

    if (!fullName || !mobile || !pincode || !city || !state || !country) {
      alert("Fill all fields");
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert("Invalid mobile number");
      return false;
    }

    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      alert("Invalid pincode");
      return false;
    }

    if (!/^[A-Za-z ]{3,}$/.test(city)) {
      alert("Invalid city");
      return false;
    }

    if (!/^[A-Za-z ]{3,}$/.test(state)) {
      alert("Invalid state");
      return false;
    }

    if (!/^[A-Za-z ]{3,}$/.test(country)) {
      alert("Invalid country");
      return false;
    }

    return true;
  };

  const saveAddress = async () => {
    if (!validateAddress()) return;

    try {
      const res = await API.post("/user/address", address);

      setSavedAddress(res.data.address);
      setShowForm(false);

      alert("Address saved successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to save address");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-6 p-6 bg-gray-100">
      <div className="w-[250px] bg-white shadow-md rounded-lg p-4">
        <div className="flex items-center gap-2 md:gap-3 mb-5">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.username}&background=ec4899&color=fff`}
            className="w-12 h-12 rounded-full"
            alt="profile"
          />
          <div>
            <p className="text-sm text-gray-500">Hello,</p>
            <p className="font-semibold">{user?.username}</p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("profile")}
          className="w-full text-left p-2"
        >
          Profile Info
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className="w-full text-left p-2"
        >
          My Orders
        </button>

        <button
          onClick={() => setActiveTab("address")}
          className="w-full text-left p-2"
        >
          Manage Address
        </button>
      </div>

      <div className="flex-1 bg-white shadow-md rounded-lg p-6">
        {activeTab === "profile" && user && (
          <div>
            <h2 className="text-xl font-bold mb-4">Profile</h2>
            <p>Name: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Mobile: {user.mobileNumber}</p>

            <div className="mt-6 flex  gap-3">
              <button
                onClick={handleHome}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Home
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h2 className="text-xl font-bold mb-4">My Orders</h2>

            <p className="mb-4 text-gray-600">View your placed orders here</p>

            <button
              onClick={() => navigate("/my-orders")}
              className="bg-pink-600 text-white px-4 py-2 rounded"
            >
              Go to Orders
            </button>
            <div className="mt-6">
              <button
                onClick={handleHome}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Home
              </button>
            </div>
          </div>
        )}

        {activeTab === "address" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Address</h2>

            {savedAddress && (
              <div className="border p-4 mb-4 bg-green-50 rounded">
                <p>
                  <b>{savedAddress.fullName}</b>
                </p>
                <p>{savedAddress.mobile}</p>
                <p>
                  {savedAddress.city}, {savedAddress.state},{" "}
                  {savedAddress.country} - {savedAddress.pincode}
                </p>
              </div>
            )}

            <button
              onClick={() => setShowForm(true)}
              className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            >
              Add New Address
            </button>

            <div className="">
              <button
                onClick={handleHome}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Home
              </button>
            </div>

            {showForm && (
              <div className="space-y-2">
                <input
                  placeholder="Full Name"
                  className="border p-2 w-full"
                  onChange={(e) =>
                    setAddress({ ...address, fullName: e.target.value })
                  }
                />

                <input
                  placeholder="Mobile"
                  className="border p-2 w-full"
                  onChange={(e) =>
                    setAddress({ ...address, mobile: e.target.value })
                  }
                />

                {isLoaded && (
                  <Autocomplete
                    onLoad={(ref) => (autocompleteRef.current = ref)}
                    onPlaceChanged={onPlaceChanged}
                  >
                    <input
                      placeholder="Search Address"
                      className="border p-2 w-full"
                    />
                  </Autocomplete>
                )}

                <input
                  value={address.pincode}
                  readOnly
                  className="border p-2 w-full"
                />
                <input
                  value={address.city}
                  readOnly
                  className="border p-2 w-full"
                />
                <input
                  value={address.state}
                  readOnly
                  className="border p-2 w-full"
                />
                <input
                  value={address.country}
                  readOnly
                  className="border p-2 w-full"
                />

                <button
                  onClick={saveAddress}
                  className="bg-pink-600 text-white px-4 py-2 rounded"
                >
                  Save Address
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
