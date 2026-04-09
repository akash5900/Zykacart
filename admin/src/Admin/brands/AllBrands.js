import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function AllBrand() {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  const fetchBrands = async () => {
    try {
      const res = await API.get("/brand/all");
      setBrands(res.data.brands || res.data);
    } catch (error) {
      console.log("Error fetching brands:", error);
    }
  };

  const deleteBrand = async (id) => {
    try {
      await API.delete("/brand/delete/" + id);
      fetchBrands();
    } catch (error) {
      console.log("Error deleting brand:", error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div>
      <h2 className="text-xl text-pink-800 font-bold mb-4">All Brands</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-pink-200 text-pink-800">
            <th className="p-2">Image</th>
            <th className="p-2">Name</th>
            <th className="p-2">Edit</th>
            <th className="p-2">Delete</th>
          </tr>
        </thead>

        <tbody>
          {brands.map((brand) => (
            <tr key={brand._id} className="text-center text-pink-800 border">
              <td className="p-2">
                <img
                  src={brand.image}
                  alt=""
                  className="w-16 h-16 object-cover mx-auto"
                />
              </td>

              <td>{brand.name}</td>

              <td>
                <button
                  className="bg-pink-500 text-white px-3 py-1"
                  onClick={() => navigate(`/edit-brand/${brand._id}`)}
                >
                  Edit
                </button>
              </td>

              <td>
                <button
                  className="bg-pink-800 text-white px-3 py-1"
                  onClick={() => deleteBrand(brand._id)}
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

export default AllBrand;