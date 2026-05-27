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

  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([]);
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
        price: res.data.price || "",
        category: res.data.category?._id,
        description: res.data.description,
      });

      setVariants(res.data.variants || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    const res = await API.get("/category/categorys");
    setCategories(res.data?.category || res.data || []);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ multiple image handler
  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  // ✅ variant change
  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  // ✅ DELETE VARIANT
  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  // ✅ ADD VARIANT (optional but useful)
  const addVariant = () => {
    setVariants([
      ...variants,
      { size: "", color: "", price: "" },
    ]);
  };

  const handleUpdate = async () => {
    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // ✅ CLEAN VARIANTS (important)
      const cleanVariants = variants.filter(
        (v) => v.size && v.color && v.price
      );

      data.append("variants", JSON.stringify(cleanVariants));

      // ✅ images
      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }

      await API.put(`/product/update/${id}`, data);

      alert("Product Updated ✅");
      navigate("/seller-dashboard");
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  return (
    <div className="flex justify-center items-center px-3 ">
      <div className="border border-pink-800 w-[full] md:w-[480px] mt-[100px] md:mt-[50px] md:mb-[50px] min-h-[480px] flex flex-col items-center justify-center gap-[13px] rounded-[10px] md:pt-[20px] ">
        
        <h1 className="text-xl md:text-3xl text-semibold text-pink-800 mb-5 pt-5">
          Edit Seller Product
        </h1>

        {/* NAME */}
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-pink-800 p-2 md:p-2 w-[480px] max-w-[400px] rounded-[10px] text-pink-800 bg-pink-50"
        />

        {/* PRICE */}
        <input
          name="price"
          placeholder="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          className="border border-pink-800 p-2 md:p-3 w-[480px] max-w-[400px] rounded-[10px] text-pink-800 bg-pink-50"
        />

        {/* CATEGORY */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border border-pink-800 p-2 md:p-2 w-[480px] max-w-[400px] rounded-[10px] text-pink-800 bg-pink-50"
        >
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* MULTIPLE IMAGES */}
        <input
          type="file"
          multiple
          onChange={handleImages}
          className="border border-pink-800 p-2 md:p-2 w-[480px] max-w-[400px] rounded-[10px] text-pink-800 bg-pink-50"
        />

        {/* VARIANTS */}
        {variants.map((v, i) => (
          <div key={i} className="flex gap-2 px-20">
            <input
              value={v.size}
              onChange={(e) => handleVariantChange(i, "size", e.target.value)}
              className="border p-1 w-full"
              placeholder="Size"
            />
            <input
              value={v.color}
              onChange={(e) => handleVariantChange(i, "color", e.target.value)}
              className="border p-1 w-full"
              placeholder="Color"
            />
            <input
              value={v.price}
              onChange={(e) => handleVariantChange(i, "price", e.target.value)}
              className="border p-1 w-full"
              placeholder="Price"
            />

            {/* DELETE BUTTON */}
            <button
              type="button"
              onClick={() => removeVariant(i)}
              className="text-red-500 text-xs"
            >
              ✕
            </button>
          </div>
        ))}

        {/* ADD VARIANT */}
        <button
          type="button"
          onClick={addVariant}
          className="bg-pink-500 text-white px-2 py-1 mt-2"
        >
          + Add Variant
        </button>

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border border-pink-800 p-2 md:p-2 w-[480px] max-w-[400px] rounded-[10px] text-pink-800 bg-pink-50"
        />

        {/* BUTTON */}
        <button
          onClick={handleUpdate}
          className="bg-pink-600 rounded border text-white p-2 md:p-3 md:mb-2 text-sm md:text-base"
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default EditProduct;