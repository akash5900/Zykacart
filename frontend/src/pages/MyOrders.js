import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const res = await API.get("/order/my-orders");
    setOrders(res.data.orders);
  };

  const cancelOrder = async (id) => {
    try {
      await API.put("/order/cancel/" + id);
      alert("Order Cancelled");

      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Error cancelling order");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!orders || orders.length === 0) {
    return (
      <div>
        <div className="flex justify-between p-4 md:px-[60px] md:py-6 md:pr-20">
          <h1 className="text-sm md:text-2xl text-pink-600 ">My Orders</h1>
          <button
            onClick={() => navigate("/")}
            className="text-sm md:text-xl text-pink-600 mb-5"
          >
            Home
          </button>
        </div>
        <p className=" flex justify-center pt-20 text-pink-600 text-lg font-semibold">
          You have not placed any orders yet.
        </p>
      </div>
    );
  }

  const deleteOrder = async (id) => {
    try {
      await API.delete("/order/delete/" + id);
      alert("Order Deleted");

      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting order");
    }
  };

  return (
    <div className=" p-4 md:px-[60px] md:py-6 md:pr-20 flex flex-col gap-4 md:gap-[15px]">
      <div className="flex justify-between">
        <h1 className="text-sm md:text-xl md:text-3xl font-semibold text-pink-600 ">My Orders</h1>
        <button
          onClick={() => navigate("/")}
          className="text-sm md:text-xl text-pink-600 mb-5"
        >
          Home
        </button>
      </div>

      {orders.map((order) => (
        <div key={order._id} className=" shadow-sm border p-5 mb-5 rounded">
          <div className="flex flex-col md:flex-row ">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 text-pink-700">
              {order.products
                .filter((item) => item.product)
                .map((item) => (
                  <div key={item._id} className="border p-2">
                    <img
                      src={item.product.image}
                      alt=""
                      className="h-[60px] w-[80px] md:h-[80px] md:w-[100px] object-cover"
                    />
                    <p>{item.product.name}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>₹{item.price}</p>
                  </div>
                ))}
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-[100px] mt-4 md:mt-0 md:ml-10 text-pink-600">
              <div className=" flex flex-col gap-[8px] ">
                <p>
                  <b>Order ID:</b> {order._id}
                </p>
                <p>
                  <b>Total:</b> ₹{order.totalAmount}
                </p>
                <p>
                  <b>Status:</b>{" "}
                  <span
                    className={
                      order.orderStatus === "Placed"
                        ? "text-yellow-600"
                        : order.orderStatus === "Shipped"
                          ? "text-blue-600"
                          : order.orderStatus === "Delivered"
                            ? "text-green-600"
                            : "text-red-600"
                    }
                  >
                    {order.orderStatus}
                  </span>
                </p>
                <p>
                  <b>Payment:</b> {order.paymentStatus}
                </p>

                {order.orderStatus === "Placed" && (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="bg-red-500 text-white px-3 py-1 mt-2"
                  >
                    Cancel Order
                  </button>
                )}

                {order.orderStatus === "Cancelled" && (
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="bg-gray-700 text-white  w-full md:w-auto px-3 py-1 mt-2 ml-2"
                  >
                    Delete Order
                  </button>
                )}
              </div>
              <div>
                <div className=" flex flex-col gap-[8px]">
                  <p>
                    <b>Name:</b> {order.address?.fullName}
                  </p>
                  <p>
                    <b>Mobile:</b> {order.address?.mobile}
                  </p>
                  <p>
                    <b>City:</b> {order.address?.city}
                  </p>
                  <p>
                    <b>State:</b> {order.address?.state}
                  </p>
                  <p>
                    <b>Pincode:</b> {order.address?.pincode}
                  </p>
                  <p>
                    <b>Country:</b> {order.address?.country}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
