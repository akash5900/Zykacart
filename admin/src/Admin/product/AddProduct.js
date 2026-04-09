import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function AddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/category/categorys");
        console.log("Categories:", res.data);
        setCategories(res.data.category || res.data.categories || []);
      } catch (err) {
        console.log("Error fetching categories:", err);
      }
    };

    const fetchBrands = async () => {
      try {
        const res = await API.get("/brand/all");
        setBrands(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
    fetchBrands();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !name || !price || !description || !image) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("brand", brand);

    try {
      await API.post("/product/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product Added");
      navigate("/all-product");
    } catch (error) {
      console.log("Error adding product:", error);
      alert("Error adding product");
    }
  };

  return (
    <div className="flex items-center justify-center h-auto">
      <div className="border border-pink-800 w-[480px] h-[530px] flex flex-col items-center gap-[40px] rounded-[10px] mt-[30px]">
        <h1 className="text-2xl font-semibold text-pink-800 mt-[30px]">
          Add Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-[15px]"
        >
          <input
            type="text"
            placeholder="Product Name"
            className="border border-pink-800 p-2 w-[420px] rounded-[10px] text-pink-800 bg-pink-50"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price"
            className="border border-pink-800 p-2 w-[420px] rounded-[10px] text-pink-800 bg-pink-50"
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <select
            className="border border-pink-800 p-2 w-[420px] bg-pink-50 rounded-[10px] text-pink-800"
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            className="border border-pink-800 p-2 w-[420px] bg-pink-50 rounded-[10px]"
            onChange={(e) => setBrand(e.target.value)}
            required
          >
            <option value="">Select Brand</option>
            {brands.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            className="border border-pink-800 p-2 w-[420px] bg-pink-50 rounded-[10px] text-pink-800"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          <textarea
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            className="border border-pink-800 p-2 w-[420px] rounded-[10px] text-pink-800 bg-pink-50"
            required
          />

          <button className="border border-pink-800 px-6 py-3 rounded-[10px] text-pink-800 hover:bg-gray-200">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
