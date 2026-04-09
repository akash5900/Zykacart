import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function AddBrand() {
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
      await API.post("/brand/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Brand Added Successfully");
      navigate("/all-brand");
    } catch (error) {
      console.log(error);
      alert("Error adding brand");
    }
  };

  return (
    <div className="flex items-center justify-center h-auto">
      <div className="border border-pink-800 w-[380px] h-[360px] flex flex-col items-center gap-[40px] rounded-[10px] mt-[100px]">
        <h2 className="text-2xl text-pink-800 mt-[50px]">Add Brand</h2>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[25px]">
          <input
            type="text"
            placeholder="Brand Name"
            className="border border-pink-800 p-2 w-[330px] rounded-[10px] text-pink-800 bg-pink-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="file"
            className="border border-pink-800 p-2 w-[330px] bg-pink-50 text-pink-800 rounded-[10px]"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button className="border border-pink-800 px-6 py-3 rounded-[10px] text-pink-800 hover:bg-gray-200">
            Add Brand
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBrand;
