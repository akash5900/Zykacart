import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get("/product/" + id);

        setName(res.data.name);
        setPrice(res.data.price || "");
        setDescription(res.data.description);
        setCategory(res.data.category?._id);
        setVariants(res.data.variants || []);
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await API.get("/category/categorys");
        setCategories(res.data.category || res.data.categories || []);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  // ✅ handle images
  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  // ✅ handle variant change
  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  // ✅ add variant
  const addVariant = () => {
    setVariants([...variants, { size: "", color: "", price: "" }]);
  };

  // ✅ remove variant
  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);

      // ✅ CLEAN VARIANTS (FIXES 500 ERROR)
      const cleanVariants = variants.filter(
        (v) => v.size && v.color && v.price
      );

      formData.append("variants", JSON.stringify(cleanVariants));

      // ✅ images
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      await API.put(`/product/admin/update/${id}`, formData);

      alert("Product Updated");
      navigate("/all-product");
    } catch (error) {
      console.log("Error updating product:", error);
      alert("Error updating product");
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="border border-pink-800 w-[450px] flex flex-col items-center justify-center gap-[20px] rounded-[10px] mt-[50px] pt-[20px] ">
        
        <h1 className="text-3xl text-semibold text-pink-800 mb-5 ">
          Edit Product
        </h1>

        <form
          onSubmit={handleUpdate}
          className="flex flex-col items-center gap-3 w-1/2"
        >
          {/* NAME */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-pink-800 p-2 w-[400px] rounded-[10px] text-pink-800 bg-pink-50"
            placeholder="Product Name"
          />

          {/* PRICE */}
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-pink-800 p-2 w-[400px] rounded-[10px] text-pink-800 bg-pink-50"
            placeholder="Price"
          />

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-pink-800 p-2 w-[400px] rounded-[10px] text-pink-800 bg-pink-50"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* IMAGES */}
          <input
            type="file"
            multiple
            onChange={handleImages}
            className="border border-pink-800 p-2 w-[400px] rounded-[10px] text-pink-800 bg-pink-50"
          />

          {/* VARIANTS */}
          {variants.map((v, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={v.size}
                onChange={(e) =>
                  handleVariantChange(i, "size", e.target.value)
                }
                className="border p-1 w-full"
                placeholder="Size"
              />
              <input
                value={v.color}
                onChange={(e) =>
                  handleVariantChange(i, "color", e.target.value)
                }
                className="border p-1 w-full"
                placeholder="Color"
              />
              <input
                value={v.price}
                onChange={(e) =>
                  handleVariantChange(i, "price", e.target.value)
                }
                className="border p-1 w-full"
                placeholder="Price"
              />

              {/* REMOVE BUTTON */}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-pink-800 p-2 w-[400px] rounded-[10px] text-pink-800 bg-pink-50"
            placeholder="Description"
          />

          {/* BUTTON */}
          <button className="bg-pink-600 rounded border text-white p-2 mb-2">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;