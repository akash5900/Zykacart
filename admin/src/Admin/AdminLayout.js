import Sidebar from "./Components/Sidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 ">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 min-h-screen p-8">
        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;