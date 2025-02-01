import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { FoodList, cartItem, removeFromCart,subTotal,url } = useContext(StoreContext);
  const navigate=useNavigate()

  const deliveryFee = subTotal > 0 ? 5.99 : 0; // Example delivery fee
  const total = subTotal + deliveryFee;
  

  // Check if cart is empty
  const isCartEmpty =
    Object.keys(cartItem).length === 0 ||
    Object.values(cartItem).every((count) => count === 0);

  return (
    <div className="flex flex-col h-screen">
      {/* If cart is empty, show a cool message */}
      {isCartEmpty ? (
        <div className="flex-1 flex items-center justify-center text-center">
          <div className="p-10">
            <h2 className="text-4xl font-semibold mb-5">
              Oops! Your cart is empty!
            </h2>
            <p className="text-xl text-gray-600">
              Add some items to your cart to get started.
            </p>
          </div>
        </div>
      ) : (
        // Upper Section - Cart Items
        <div className="flex-1 overflow-auto p-5">
          <div className="w-full">
            {/* Header for Cart Table */}
            <div className="grid grid-cols-7 gap-4 font-bold text-lg border-b pb-3">
              <p>Item</p>
              <p>Title</p>
              <p>Description</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total Price</p>
              <p>Remove</p>
            </div>

            <br />

            {/* Cart Items */}
            <hr className="h-2" />
            {FoodList.map((item, index) => {
              if (cartItem[item._id] > 0) {
                return (
                  <div
                    key={item._id}
                    className="grid grid-cols-7 gap-4 items-center border-b py-3"
                  >
                    {/* Item Image */}
                    <div>
                      <img
                        src={url+"/images/"+item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </div>

                    {/* Item Title */}
                    <div>
                      <p className="font-semibold">{item.name}</p>
                    </div>

                    {/* Item Description */}
                    <div>
                      <p className="text-sm text-gray-500">
                        {item.description || "No description available"}
                      </p>
                    </div>

                    {/* Item Price */}
                    <div>
                      <p>${item.price}</p>
                    </div>

                    {/* Quantity */}
                    <div>
                      <p>{cartItem[item._id]}</p>
                    </div>

                    {/* Total Price  */}
                    <div>
                      <p>${(item.price * cartItem[item._id]).toFixed(2)}</p>
                    </div>

                    {/* Remove Item */}
                    <div>
                      <button
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                );
              }
              return null;
            })}
            <hr className="h-2" />
          </div>
        </div>
      )}

      {/* Lower Section - Cart Summary */}
      {!isCartEmpty && (
        <div className="flex flex-col place-items-end md:flex-row p-5 gap-5 border-t bg-white">
          {/* Left - Cart Total */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-3">Cart Total</h2>
            <div className="mb-3">
              <div className="justify-between flex">
                <p>SubTotal:</p>
                <p> ${subTotal.toFixed(2)}</p>
              </div>
              <div className="justify-between flex" >
                <p>Delivery Fee:</p>
                <p> ${deliveryFee.toFixed(2)}</p>
              </div>
              <hr className="h-2" />
              <div className="justify-between flex">
                <p className="font-extrabold text-xl">Total:</p>
                <p> ${total.toFixed(2)}</p>
              </div>
            </div>
            <button onClick={(()=>navigate('/placeorder'))} className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Proceed to Checkout
            </button>
          </div>

          {/* Right - Promo Code */}
          <div className="flex-1 justify-between flex flex-col h-full">
            <h2 className="text-xl font-semibold mb-3">Have a Promo Code?</h2>
            <input
              type="text"
              placeholder="Enter promo code here"
              className="w-full p-2 border rounded-md mb-3"
            />
            <button className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Apply Promo Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
