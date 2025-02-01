import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion"; // Import Framer Motion

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch all orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/order/allorders"
      );
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error while fetching purchases");
      }
    } catch (error) {
      toast.error("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const newStatus = e.target.value;
      const response = await axios.post(
        `http://localhost:3000/api/v1/order/update`,
        { orderId, status: newStatus }
      );
      if (response.data.success) {
        toast.success("Order status updated successfully");
        fetchOrders();
      } else {
        toast.error("Error while updating order status");
      }
    } catch (error) {
      toast.error("Failed to update order status. Please try again.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6 bg-gray-100 w-full min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Purchase History
      </h1>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      ) : (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              className="bg-white flex flex-col shadow-md rounded-lg p-6 border border-gray-200 relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }} // Staggered animation
            >
              {/* Dropdown for status */}
              <div className="absolute top-4 right-4">
                <select
                  className={`p-2 text-sm font-semibold rounded-lg ${
                    order.status === "processing"
                      ? "bg-yellow-200 text-yellow-700"
                      : order.status === "canceled"
                      ? "bg-red-200 text-red-700"
                      : order.status === "out for delivery"
                      ? "bg-blue-200 text-blue-700"
                      : "bg-green-200 text-green-700"
                  }`}
                  value={order.status}
                  onChange={(e) => statusHandler(e, order._id)}
                >
                  <option value="processing" className="text-yellow-700">
                    Processing
                  </option>
                  <option value="canceled" className="text-red-700">
                    Canceled
                  </option>
                  <option value="out for delivery" className="text-blue-700">
                    Out for Delivery
                  </option>
                  <option value="delivered" className="text-green-700">
                    Delivered
                  </option>
                </select>
              </div>

              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Purchase ID:{" "}
                  <span className="text-blue-600">{order._id}</span>
                </h2>
                <p className="text-sm text-gray-600">
                  Date: {new Date(order.date).toLocaleString()}
                </p>
              </div>
              <hr className="my-4" />
              <div className="mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      order.status === "pending"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Payment:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      order.payment ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {order.payment ? "Successful" : "Failed"}
                  </span>
                </p>
                <p className="text-xl font-bold text-gray-800 mt-2">
                  Total: ${order.amount.toFixed(2)}
                </p>
              </div>
              <details className="mt-4">
                <summary className="cursor-pointer text-blue-600 font-semibold">
                  View Details
                </summary>
                <div className="mt-4 space-y-3">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700">
                      Address Information
                    </h3>
                    <p className="text-sm text-gray-600">
                      {order.address.firstName} {order.address.lastName},{" "}
                      {order.address.address}, {order.address.city},{" "}
                      {order.address.state}, {order.address.country} -{" "}
                      {order.address.pinCode}.
                      <br />
                      Contact: {order.address.phone}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700">
                      Item Details
                    </h3>
                    <ul className="text-sm text-gray-600 list-disc ml-5">
                      {order.items.map((item, index) => (
                        <li key={index}>
                          <span className="font-semibold">{item.name}</span> (
                          {item.category}) - ${item.price} x {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </details>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Orders;
