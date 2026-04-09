import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function AllCategory() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      const res = await API.get("/category/categorys");
      setCategories(res.data.category || res.data.categories || []);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const deleteCategory = async (id) => {
    try {
      await API.delete("/category/categorys/" + id);
      getCategories();
    } catch (error) {
      console.log("Error deleting category:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-pink-800 font-bold mb-6">
        All Categories
      </h1>

      <table className="w-full border">
        <thead className="bg-pink-100">
          <tr className="text-pink-800">
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Edit</th>
            <th className="border p-2">Delete</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id} className="text-center">
              <td className="border p-2">
                <img
                  src={cat.image}
                  alt=""
                  className="w-16 h-16 object-cover mx-auto"
                />
              </td>

              <td className="border text-pink-800 p-2">{cat.name}</td>

              <td className="border p-2">
                <button
                  onClick={() => navigate(`/edit-category/${cat._id}`)}
                  className="bg-pink-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
              </td>

              <td className="border p-2">
                <button
                  onClick={() => deleteCategory(cat._id)}
                  className="bg-pink-800 text-white px-3 py-1 rounded"
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

export default AllCategory;