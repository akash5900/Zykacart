import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Adminlayout from "./Admin/AdminLayout";
import AdminLogin from "./Admin/AdminLogin";
import AdminProtectedRoute from "./Admin/AdminProtectedRoute";
import AdminSignup from "./Admin/AdminSignup";

import Addcategory from "./Admin/category/AddCategory";
import AllCategory from "./Admin/category/Allcategory";
import EditCategory from "./Admin/category/EditCategory";

import AddProduct from "./Admin/product/AddProduct";
import AllProduct from "./Admin/product/AllProduct";
import EditProduct from "./Admin/product/EditProduct";

import AddBrand from "./Admin/brands/AddBrand";
import AllBrand from "./Admin/brands/AllBrands";
import EditBrand from "./Admin/brands/EditBrand";

import AddBanner from "./Admin/banner/AddBanner";
import AllBanner from "./Admin/banner/AllBanner";
import EditBanner from "./Admin/banner/EditBanner";

import AllOrders from "./Admin/orders/AllOrders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/"
          element={
            <AdminProtectedRoute>
              <Adminlayout />
            </AdminProtectedRoute>
          }
        >
          <Route path="add-category" element={<Addcategory />} />
          <Route path="all-category" element={<AllCategory />} />
          <Route path="edit-category/:id" element={<EditCategory />} />

          <Route path="add-product" element={<AddProduct />} />
          <Route path="all-product" element={<AllProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />

          <Route path="add-brand" element={<AddBrand />} />
          <Route path="all-brand" element={<AllBrand />} />
          <Route path="edit-brand/:id" element={<EditBrand />} />

          <Route path="/add-banner" element={<AddBanner />} />
          <Route path="/all-banner" element={<AllBanner />} />
          <Route path="/edit-banner/:id" element={<EditBanner />} />

          <Route path="/all-orders" element={<AllOrders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
