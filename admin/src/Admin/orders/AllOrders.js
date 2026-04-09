import { useEffect, useState } from "react";
import API from "../api";

function AllOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/order/all-orders");
      console.log("ORDERS DATA:", res.data);
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/order/status/${id}`, { status });
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="">
      <h1 className="text-2xl text-pink-800 font-bold mb-4">All Orders</h1>
      <div className="w-full overflow-x-auto">
        <table className="w-full border ">
          <thead>
            <tr className="bg-pink-200 text-pink-800">
              <th className="p-2">Order ID</th>
              <th className="p-2">User</th>
              <th className="p-2">Total</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="text-center text-pink-800 border">
                <td className="p-2">{o._id.slice(-6)}</td>
                <td className="p-2">{o.user?.username}</td>
                <td className="p-2">₹ {o.totalAmount}</td>
                <td className="p-2">{o.paymentStatus}</td>
                <td className="p-2">{o.orderStatus}</td>
                <td className="p-2">
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2">
                  <select
                    onChange={(e) => updateStatus(o._id, e.target.value)}
                    value={o.orderStatus}
                    className="border p-1"
                  >
                    <option value="Placed">Placed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllOrders;
