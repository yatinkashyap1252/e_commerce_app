import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import "../orders.css";

const Order = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null); // Track expanded orders

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/order/getorders`,
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const toggleOrderDetails = (index) => {
    setExpandedOrder(expandedOrder === index ? null : index);
  };

  return (
    <div className="order-container">
      <h1 className="order-header">Your Orders</h1>
      {data.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        data.map((order, index) => (
          <div key={index} className="order-card">
            {/* Order Overview */}
            <div className="order-summary">
              <div className="order-info">
                <h2 className="order-number">Order #{index + 1}</h2>
                <p className="order-date">
                  <strong>Date:</strong>{" "}
                  {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="order-status">
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      order.status === "Delivered"
                        ? "status-delivered"
                        : "status-pending"
                    }
                  >
                    {order.status}
                  </span>
                </p>
                <p className="order-payment">
                  <strong>Payment:</strong>{" "}
                  <span
                    className={order.payment ? "status-paid" : "status-unpaid"}
                  >
                    {order.payment ? "Paid" : "Pending"}
                  </span>
                </p>
              </div>
              <button className="track-button">Track Order</button>
              <button
                className="dropdown-button"
                onClick={() => toggleOrderDetails(index)}
              >
                {expandedOrder === index ? "Hide Details" : "View Details"}
              </button>
            </div>

            {/* Order Details (Expandable Section) */}
            {expandedOrder === index && (
              <div className="order-details">
                <div className="shipping-address">
                  <h3>Shipping Address</h3>
                  <p>
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p>{order.address.address}</p>
                  <p>
                    {order.address.city}, {order.address.state} -{" "}
                    {order.address.pinCode}
                  </p>
                  <p>{order.address.country}</p>
                  <p>
                    <strong>Email:</strong> {order.address.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {order.address.phone}
                  </p>
                </div>
                <div className="order-items">
                  <h3>Items:</h3>
                  {order.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="item-card">
                      <img
                        src={`${url}/images/${item.image}`}
                        alt={item.name}
                        className="item-image"
                      />
                      <div className="item-info">
                        <p className="item-name">{item.name}</p>
                        <p>Category: {item.category}</p>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="order-total">
                  <strong>Total Amount:</strong> ${order.amount.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Order;
