import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function SellerProducts() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await API.get("/product/my-products"); // ✅ FIXED
      setProducts(res.data.products);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await API.delete("/product/delete/" + id);
      alert("Product Deleted");
      getProducts(); // refresh
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  return (
    <div className="px-3 md:px-[65px] py-3 md:py-[15px]">
      <div className="flex justify-between mb-5">
        <h1 className="text-lg md:text-2xl text-pink-800 font-bold">
          My Products
        </h1>

        <Link
          to="/add-product"
          className="bg-pink-800 text-white text-sm md:text-base px-3 py-1 md:px-4 md:py-2"
        >
          Add Product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border min-w-[700px]">
          <thead className="bg-pink-100">
            <tr className="text-pink-800">
              <th className="p-2">Image</th>
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2 hidden md:table-cell">Category</th>
              <th className="p-2">Brand</th>
              <th className="p-2">Edit</th>
              <th className="p-2">Delete</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border text-center text-xs md:text-sm text-pink-800"
              >
                <td className="p-2">
                  <img
                    src={product.image}
                    alt=""
                    className="w-12 h-12 md:w-16 md:h-16 object-cover mx-auto"
                  />
                </td>

                <td className="p-2">{product.name}</td>
                <td className="p-2">₹{product.price}</td>
                <td className="p-2 hidden md:table-cell">{product.category?.name}</td>
                <td className="p-2">{product.brand?.name}</td>

                <td className="p-2">
                  <Link
                    to={`/edit-product/${product._id}`}
                    className="bg-pink-500 text-white text-xs md:text-sm px-2 md:px-3 py-1"
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
    </div>
  );
}

export default SellerProducts;
