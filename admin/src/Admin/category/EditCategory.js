import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getSingleCategory = async () => {
      try {
        const res = await API.get("/category/categorys");
        const categories = res.data.category || res.data.categories || [];
        const category = categories.find((c) => c._id === id);

        if (category) {
          setName(category.name);
        }
      } catch (error) {
        console.log("Error fetching category:", error);
      }
    };

    getSingleCategory();
  }, [id]);

  const updateCategory = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }

    try {
      await API.put("/category/categorys/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Category Updated");
      navigate("/all-category");
    } catch (error) {
      console.log("Error updating category:", error);
      alert("Error updating category");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="border border-pink-800 w-[380px] h-[360px] flex flex-col items-center justify-center gap-[40px] rounded-[10px] mt-[100px]">
        <form
          onSubmit={updateCategory}
          className="flex flex-col items-center gap-[25px]"
        >
          <h1 className="text-2xl text-pink-800 mt-[40px]">
            Edit Category
          </h1>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-pink-800 p-2 w-[330px] rounded-[10px] text-pink-800 bg-pink-50"
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border border-pink-800 p-2 w-[330px] rounded-[10px]"
          />

          <button className="border border-pink-800 px-6 py-3 rounded-[10px] text-pink-800 hover:bg-gray-200">
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCategory;