import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const { subTotal, token, url, cartItem, FoodList } = useContext(StoreContext);
  const deliveryFee = subTotal > 0 ? 5.99 : 0; // Example delivery fee
  const total = subTotal + deliveryFee;
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const OnChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    const orderItems = FoodList.filter((item) => cartItem[item._id] > 0).map(
      (item) => ({
        ...item,
        quantity: cartItem[item._id],
      })
    );

    const orderData = { address: data, items: orderItems, amount: total };

    try {
      const response = await axios.post(`${url}/order/placeorder`, orderData, {
        headers: { token },
      });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      }
    } catch (error) {
      setErrorMessage("Failed to place the order. Please try again later.");
      console.error("Error placing order:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else if (total === 0) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-5">Delivery Information</h2>
        <form className="space-y-4" onSubmit={placeOrder}>
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              name="firstName"
              onChange={OnChangeHandler}
              value={data.firstName}
              type="text"
              placeholder="First Name"
              className="p-2 border rounded-md w-full"
            />
            <input
              required
              name="lastName"
              onChange={OnChangeHandler}
              value={data.lastName}
              type="text"
              placeholder="Last Name"
              className="p-2 border rounded-md w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              name="email"
              onChange={OnChangeHandler}
              value={data.email}
              type="email"
              placeholder="Email-id"
              className="p-2 border rounded-md w-full"
            />
            <input
              required
              name="address"
              onChange={OnChangeHandler}
              value={data.address}
              type="text"
              placeholder="Address"
              className="p-2 border rounded-md w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              name="city"
              onChange={OnChangeHandler}
              value={data.city}
              type="text"
              placeholder="City"
              className="p-2 border rounded-md w-full"
            />
            <input
              required
              name="state"
              onChange={OnChangeHandler}
              value={data.state}
              type="text"
              placeholder="State"
              className="p-2 border rounded-md w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              name="pinCode"
              onChange={OnChangeHandler}
              value={data.pinCode}
              type="text"
              placeholder="Pin-Code"
              className="p-2 border rounded-md w-full"
            />
            <input
              required
              name="country"
              onChange={OnChangeHandler}
              value={data.country}
              type="text"
              placeholder="Country"
              className="p-2 border rounded-md w-full"
            />
          </div>
          <input
            required
            name="phone"
            onChange={OnChangeHandler}
            value={data.phone}
            type="text"
            placeholder="Phone"
            className="p-2 border rounded-md w-full"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Proceed to Checkout
          </button>
        </form>
        {errorMessage && (
          <p className="text-red-500 text-sm mt-3">{errorMessage}</p>
        )}
      </div>

      <div className="bg-white p-5 shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-3">Cart Total</h2>
        <div className="mb-3">
          <div className="flex justify-between">
            <p>SubTotal:</p>
            <p>${subTotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Delivery Fee:</p>
            <p>${deliveryFee.toFixed(2)}</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <p className="font-extrabold text-xl">Total:</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
