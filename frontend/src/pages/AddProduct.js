import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    const res = await API.get("/category/categorys");
    setCategories(res.data?.category || res.data || []);
  };

  const fetchBrands = async () => {
    const res = await API.get("/brand/all");
    setBrands(res.data?.brands || res.data || []);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (image) {
        data.append("image", image);
      }

      await API.post("/product/add", data);

      alert("Product Added ✅");

      navigate("/seller-dashboard"); // 🔥 go back
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="border border-pink-800 w-full w-[399px] md:w-[480px] h-[520px] flex flex-col items-center gap-[15px] rounded-[10px] mt-[100px] ">
        <h2 className="text-2xl font-semibold text-pink-800 mt-[25px] mb-[20px] ">
          Add Product
        </h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border border-pink-800 p-2 w-[380px] md:w-[420px] rounded-[10px] text-pink-800 bg-pink-50"
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          onChange={handleChange}
          className="border border-pink-800 p-2 w-[380px] md:w-[420px] rounded-[10px] text-pink-800 bg-pink-50"
        />

        <select
          name="category"
          onChange={handleChange}
          className="border border-pink-800 p-2 w-[380px] md:w-[420px] rounded-[10px] text-pink-800 bg-pink-50"
        >
          <option>Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          name="brand"
          onChange={handleChange}
          className="border border-pink-800 p-2 w-[380px] md:w-[420px] rounded-[10px] text-pink-800 bg-pink-50"
        >
          <option>Select Brand</option>
          {brands.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          onChange={handleImage}
          className="border border-pink-800 p-2 w-[380px] md:w-[420px] bg-pink-50 rounded-[10px] text-pink-800"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border border-pink-800 p-2 w-[380px] md:w-[420px] rounded-[10px] text-pink-800 bg-pink-50"
        />

        <button
          onClick={handleSubmit}
          className="border border-pink-800 px-6 py-3 rounded-[10px] text-pink-800 hover:bg-gray-200"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
