import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function AddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  // ✅ multiple images
  const [images, setImages] = useState([]);

  // ✅ variants
  const [variants, setVariants] = useState([
    { size: "", color: "", price: "", stock: "" },
  ]);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await API.get("/category/categorys");
      setCategories(res.data?.category || res.data || []);
    };

    const fetchBrands = async () => {
      const res = await API.get("/brand/all");
      setBrands(res.data?.brands || res.data || []);
    };

    fetchCategories();
    fetchBrands();
  }, []);

  // ✅ handle multiple images
  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  // ✅ handle variants
  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !category || !brand || images.length === 0) {
      alert("Fill all required fields");
      return;
    }

    const cleanVariants = variants.filter((v) => v.size && v.color && v.price);

    if (cleanVariants.length === 0) {
      alert("Add at least one variant");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price); // fallback
    formData.append("description", description);
    formData.append("category", category);
    formData.append("brand", brand);

    // ✅ variants
    formData.append("variants", JSON.stringify(cleanVariants));

    // ✅ multiple images
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      await API.post("/product/create", formData);

      alert("Product Added ✅");
      navigate("/all-product");
    } catch (error) {
      console.log(error);
      alert("Error adding product");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="border border-pink-800 w-full w-[399px] md:w-[480px] flex flex-col items-center gap-[15px] rounded-[10px] mt-[12px] p-4">
        <h1 className="text-2xl font-semibold text-pink-800 mt-[10px] mb-[10px]">
          Add Product
        </h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <input
            type="text"
            placeholder="Product Name"
            className="border border-pink-800 p-2 w-full rounded-[10px] text-pink-800 bg-pink-50"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Base Price (optional)"
            className="border border-pink-800 p-2 w-full rounded-[10px] text-pink-800 bg-pink-50"
            onChange={(e) => setPrice(e.target.value)}
          />

          <select
            onChange={(e) => setCategory(e.target.value)}
            className="border border-pink-800 p-2 w-full rounded-[10px] text-pink-800 bg-pink-50"
          >
            <option>Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setBrand(e.target.value)}
            className="border border-pink-800 p-2 w-full rounded-[10px] text-pink-800 bg-pink-50"
          >
            <option>Select Brand</option>
            {brands.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>

          {/* ✅ multiple images */}
          <input
            type="file"
            multiple
            onChange={handleImages}
            className="border border-pink-800 p-2 w-full bg-pink-50 rounded-[10px] text-pink-800"
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
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            className="border border-pink-800 p-2 w-full rounded-[10px] text-pink-800 bg-pink-50"
          />

          {/* ✅ variants */}
          <div className="w-full">
            <h3 className="text-pink-800 font-semibold">Variants</h3>

            {variants.map((v, i) => (
              <div key={i} className="flex gap-2 mt-2">
                <input
                  placeholder="Size"
                  onChange={(e) =>
                    handleVariantChange(i, "size", e.target.value)
                  }
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

          <button className="border border-pink-800 px-6 py-3 rounded-[10px] text-pink-800 hover:bg-gray-200 mt-3">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
