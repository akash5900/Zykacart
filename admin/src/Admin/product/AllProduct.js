import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function AllProduct() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await API.get("/product/all");
      setProducts(res.data.products || res.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete("/product/admin/delete/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Product Deleted by Admin ✅");
      getProducts();
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl text-pink-800 font-bold">All Products</h1>
        <Link to="/add-product" className="bg-pink-800 text-white px-4 py-2">
          Add Product
        </Link>
      </div>

      <table className="w-full border">
        <thead className="bg-pink-100">
          <tr className="text-pink-800">
            <th className="p-2">Image</th>
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Category</th>
            <th className="p-2">Brand</th>
            <th className="p-2">Edit</th>
            <th className="p-2">Delete</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border text-center text-pink-800">
              <td className="p-2">
                <img
                  src={product.image}
                  alt=""
                  className="w-16 h-16 object-cover mx-auto"
                />
              </td>

              <td className="p-2">{product.name}</td>
              <td className="p-2">₹{product.price}</td>
              <td className="p-2">{product.category?.name}</td>
              <td className="p-2">{product.brand?.name}</td>

              <td className="p-2">
                <Link
                  to={`/edit-product/${product._id}`}
                  className="bg-pink-500 text-white px-3 py-1"
                >
                  Edit
                </Link>
              </td>

              <td className="p-2">
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="bg-pink-800 text-white px-3 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllProduct;
