import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const ItemTile = ({ id, name, image, price, description }) => {
  const { cartItem, addtoCart, removeFromCart ,url} = useContext(StoreContext);

  return (
    <div
      className="item-page-container"
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      {/* Item Image */}
      <img
        src={url+"/images/"+image}
        alt={name}
        className="item-image"
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "10px",
          marginBottom: "15px",
        }}
      />

      {/* Item Details */}
      <div className="item-details">
        <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>{name}</h2>
        <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: "15px" }}>
          $ {price}
        </p>
        <p
          style={{
            fontSize: "1rem",
            color: "#666",
            lineHeight: "1.5",
            marginBottom: "20px",
          }}
        >
          {description}
        </p>
      </div>

      {/* Counter for Adding Items */}
      <div
        className="item-actions"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => removeFromCart(id)} // Wrap in an anonymous function
          style={{
            padding: "10px",
            fontSize: "1rem",
            color: "#fff",
            backgroundColor: "#dc3545",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
          disabled={!cartItem[id]} // Disable if the item is not in the cart
        >
          -
        </button>
        <span
          style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0 10px" }}
        >
          {cartItem[id] || 0} {/* Show 0 if undefined */}
        </span>
        <button
          onClick={() => addtoCart(id)} // Wrap in an anonymous function
          style={{
            padding: "10px",
            fontSize: "1rem",
            color: "#fff",
            backgroundColor: "#28a745",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ItemTile;