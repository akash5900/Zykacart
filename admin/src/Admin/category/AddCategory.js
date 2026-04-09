import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Addcategory() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image) {
      alert("Please Enter all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      await API.post("/category/categorys", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Category created successfully");
      setName("");
      setImage(null);
      e.target.reset();

      navigate("/all-category");
    } catch (error) {
      console.log(error);
      alert("Error creating category");
    }
  };

  return (
    <div className="flex items-center justify-center h-auto">
      <div className="border border-pink-800 w-[380px] h-[360px] flex flex-col items-center gap-[40px] rounded-[10px] mt-[100px]">
        <h1 className="text-2xl text-pink-800 mt-[50px]">Add Category</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-[25px]"
        >
          <input
            type="text"
            placeholder="Enter Category Name"
            value={name}
            className="border border-pink-800 p-2 w-[330px] rounded-[10px] text-pink-800 bg-pink-50"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            className="border border-pink-800 p-2 w-[330px] bg-pink-50 text-pink-800 rounded-[10px]"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button
            type="submit"
            className="border border-pink-800 px-6 py-3 rounded-[10px] text-pink-800 hover:bg-gray-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addcategory;