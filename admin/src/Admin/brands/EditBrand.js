import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

function EditBrand() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await API.get("/brand/all");
        const brands = res.data.brands || res.data;
        const brand = brands.find((b) => b._id === id);

        if (brand) {
          setName(brand.name);
        }
      } catch (error) {
        console.log("Error fetching brand:", error);
      }
    };

    fetchBrand();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }

    try {
      await API.put("/brand/update/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Brand Updated");
      navigate("/all-brand");
    } catch (error) {
      console.log("Error updating brand:", error);
      alert("Error updating brand");
    }
  };

  return (
    <div className="flex items-center justify-center h-auto">
      <div className="border border-pink-800 w-[380px] h-[360px] flex flex-col items-center gap-[40px] rounded-[10px] mt-[100px] bg-gray-100">
        <h2 className="text-2xl text-pink-800 mt-[50px]">Edit Brand</h2>

        <form
          onSubmit={handleUpdate}
          className="flex flex-col  items-center gap-[25px]"
        >
          <input
            type="text"
            className="border border-pink-800 p-2 w-[330px] rounded-[10px] text-pink-800 bg-pink-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Brand Name"
          />

          <input
            type="file"
            className="border border-pink-800 p-2 w-[330px] rounded-[10px] text-pink-800 bg-pink-50"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button className="border border-pink-800 px-6 py-3 rounded-[10px] text-pink-800 hover:bg-gray-200">
            Update Brand
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBrand;
