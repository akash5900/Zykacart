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

  const [images, setImages] = useState([]);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [variants, setVariants] = useState([
    { size: "", color: "", price: "", stock: "" },
  ]);

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

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => {
      const newFiles = files.filter(
        (file) => !prev.some((p) => p.name === file.name),
      );
      return [...prev, ...newFiles];
    });
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleSubmit = async () => {
    try {
      if (images.length === 0) {
        alert("Please add at least one image");
        return;
      }

      const cleanVariants = variants.filter(
        (v) => v.size && v.color && v.price,
      );

      if (cleanVariants.length === 0) {
        alert("Add at least one valid variant");
        return;
      }

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      data.append("variants", JSON.stringify(variants));

      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }

      await API.post("/product/add", data);

      alert("Product Added ✅");
      navigate("/seller-dashboard");
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="border border-pink-800 w-full w-[330px] md:w-[480px] flex flex-col items-center gap-[15px] rounded-[10px] mt-[12px] mb-[10px] p-4">
        <h2 className="text-2xl font-semibold text-pink-800 mt-[10px] mb-[10px]">
          Add Product
        </h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border border-pink-800 px-3 py-2 w-full rounded-[10px] text-pink-800 bg-pink-50"
        />

        <input
          name="price"
          placeholder="Base Price (optional)"
          type="number"
          onChange={handleChange}
          className="border border-pink-800 px-3 py-2 w-full rounded-[10px] text-pink-800 bg-pink-50"
        />

        <select
          name="category"
          onChange={handleChange}
          className="border border-pink-800 px-3 py-2 w-full rounded-[10px] text-pink-800 bg-pink-50"
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
          className="border border-pink-800 px-3 py-2 w-full rounded-[10px] text-pink-800 bg-pink-50"
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
          multiple
          onChange={handleImages}
          className="border border-pink-800 px-3 py-2 w-full bg-pink-50 rounded-[10px] text-pink-800"
        />

        <div className="flex gap-2 mt-2 flex-wrap">
          {images.map((img, i) => (
            <div key={i} className="flex items-center gap-1">
              <p className="text-sm text-pink-600">{img.name}</p>
              <button
                onClick={() =>
                  setImages(images.filter((_, index) => index !== i))
                }
                className="text-red-500 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border border-pink-800 px-3 py-2 w-full rounded-[10px] text-pink-800 bg-pink-50"
        />

        <div className="w-full">
          <h3 className="text-pink-800 font-semibold">Variants</h3>

          {variants.map((v, i) => (
            <div key={i} className="flex gap-2 mt-2">
              <input
                placeholder="Size"
                onChange={(e) => handleVariantChange(i, "size", e.target.value)}
                className="border p-1 w-full"
              />
              <input
                placeholder="Color"
                onChange={(e) =>
                  handleVariantChange(i, "color", e.target.value)
                }
                className="border p-1 w-full"
              />
              <input
                placeholder="Price"
                type="number"
                onChange={(e) =>
                  handleVariantChange(i, "price", e.target.value)
                }
                className="border p-1 w-full"
              />
              <input
                placeholder="Stock"
                type="number"
                onChange={(e) =>
                  handleVariantChange(i, "stock", e.target.value)
                }
                className="border p-1 w-full"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setVariants([
                ...variants,
                { size: "", color: "", price: "", stock: "" },
              ])
            }
            className="mt-2 bg-pink-500 text-white px-3 py-1 rounded"
          >
            + Add Variant
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="border border-pink-800 px-6 py-3 rounded-[10px] text-pink-800 hover:bg-gray-200 mt-3"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
