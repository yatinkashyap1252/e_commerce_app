import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import ItemTile from "./itemTile";

const ItemDisplay = ({ category }) => {
  const { FoodList } = useContext(StoreContext);

  return (
    <div className="item-display-container" style={{ padding: "20px" }} >
      {/* Section Title */}
      <h2
        style={{ fontSize: "2rem", marginBottom: "20px", textAlign: "center" }}
      >
        Top Recommendations
      </h2>

      {/* Items Grid */}
      <div
        className="items-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {FoodList && FoodList.length > 0 ? (
          FoodList.map((item) => {
            // console.log(category, item.category); // Debugging output
            if (category === "All" || category === item.category) {
              return (
                <ItemTile
                  key={item._id} // Use a unique key for better performance
                  id={item._id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  description={item.description}
                />
              );
            }
            return null; // Ensure the map function always returns a value
          })
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            No items to display.
          </p>
        )}
      </div>
    </div>
  );
};

export default ItemDisplay;
