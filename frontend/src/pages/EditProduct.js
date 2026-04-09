import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/product/${id}`);

      setFormData({
        name: res.data.name,
        price: res.data.price,
        category: res.data.category?._id,
        description: res.data.description,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 Fetch categories
  const fetchCategories = async () => {
    const res = await API.get("/category/categorys");
    setCategories(res.data?.category || res.data || []);
  };

  // 🔹 Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Image
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  // 🔹 Update product
  const handleUpdate = async () => {
    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (image) {
        data.append("image", image);
      }

      await API.put(`/product/update/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product Updated ✅");
      navigate("/seller-dashboard");
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  return (
    <div className="flex justify-center items-center  px-3 ">
      <div className="border border-pink-800 w-full max-w-[450px] mt-[100px] md:mt-[50px] min-h-[480px] flex flex-col items-center justify-center gap-[13px] rounded-[10px] md:pt-[20px] ">
        <h1 className="text-xl md:text-3xl text-semibold text-pink-800 mb-5">Edit Seller Product</h1>

        {/* NAME */}
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-pink-800 p-2 md:p-2 w-[380px] max-w-[400px] rounded-[10px] text-pink-800 bg-pink-50"
        />

        {/* PRICE */}
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          className="border border-pink-800 p-2 md:p-3 w-[380px] max-w-[400px] rounded-[10px] text-pink-800 bg-pink-50"
        />

        {/* CATEGORY */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border border-pink-800 p-2 md:p-2 w-[380px] max-w-[400px] rounded-[10px] text-pink-800 bg-pink-50"
        >
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* IMAGE */}
        <input
          type="file"
          onChange={handleImage}
          className="border border-pink-800 p-2 md:p-2 w-[380px] max-w-[400px] rounded-[10px] text-pink-800 bg-pink-50"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border border-pink-800 p-2 md:p-2 w-[380px] max-w-[400px] rounded-[10px] text-pink-800 bg-pink-50"
        />

        {/* BUTTON */}
        <button
          onClick={handleUpdate}
          className="bg-pink-600 rounded border text-white p-2 md:p-3 text-sm md:text-base"
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default EditProduct;