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
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get("/product/" + id);
        setName(res.data.name);
        setPrice(res.data.price);
        setDescription(res.data.description);
        setCategory(res.data.category?._id);
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);

    if (image) {
      formData.append("image", image);
    }

    try {
      await API.put(`/product/admin/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product Updated");
      navigate("/all-product");
    } catch (error) {
      console.log("Error updating product:", error);
      alert("Error updating product");
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="border border-pink-800 w-[450px] h-[460px] flex flex-col items-center justify-center gap-[20px] rounded-[10px] mt-[50px] pt-[20px] ">
        <h1 className="text-3xl text-semibold text-pink-800 mb-5 ">Edit Product</h1>

        <form onSubmit={handleUpdate} className="flex flex-col items-center gap-3 w-1/2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-pink-800 p-2 w-[400px] rounded-[10px] text-pink-800 bg-pink-50"
            placeholder="Product Name"
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-pink-800 p-2 w-[400px] rounded-[10px] text-pink-800 bg-pink-50"
            placeholder="Price"
          />

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

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border border-pink-800 p-2 w-[400px] rounded-[10px] text-pink-800 bg-pink-50"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-pink-800 p-2 w-[400px] rounded-[10px] text-pink-800 bg-pink-50"
            placeholder="Description"
          />

          <button className="bg-pink-600 rounded border text-white p-2">Update Product</button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
