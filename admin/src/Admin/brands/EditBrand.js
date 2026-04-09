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
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Brand</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Brand Name"
        />

        <input
          type="file"
          className="border p-2 w-full"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="bg-green-500 text-white px-4 py-2">
          Update Brand
        </button>
      </form>
    </div>
  );
}

export default EditBrand;