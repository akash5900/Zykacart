import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function AllBanner() {
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate();

  const fetchBanners = async () => {
    try {
      const res = await API.get("/banner/all");
      setBanners(res.data.banners || []);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  const deleteBanner = async (id) => {
    try {
      await API.delete("/banner/delete/" + id);
      fetchBanners();
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div>
      <h2 className="text-xl text-pink-800 font-bold mb-4">All Banners</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-pink-200 text-pink-800">
            <th className="p-2">Image</th>
            <th className="p-2">Title</th>
            <th className="p-2">Edit</th>
            <th className="p-2">Delete</th>
          </tr>
        </thead>

        <tbody>
          {banners.map((banner) => (
            <tr key={banner._id} className="text-center text-pink-800 border">
              <td className="p-2">
                <img
                  src={banner.image}
                  alt=""
                  className="w-16 h-16 object-cover mx-auto"
                />
              </td>
              <td>{banner.title}</td>

              <td>
                <button
                  className="bg-pink-500 text-white px-3 py-1"
                  onClick={() => navigate(`/edit-banner/${banner._id}`)}
                >
                  Edit
                </button>
              </td>

              <td>
                <button
                  className="bg-pink-800 text-white px-3 py-1"
                  onClick={() => deleteBanner(banner._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllBanner;