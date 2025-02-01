import React from "react";
import { menuItems } from "../lib/menuItems";
import ItemDisplay from "./itemDisplay";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="w-5/6 h-fit p-10 m-auto text-center" id="category" >
      <p className="text-3xl font-bold mb-5">Explore the Menu!</p>
      <p className="text-xl font-light text-slate-500 mb-6">
        Discover our exciting range of electronics and gadgets. Whether you're
        looking for the latest smartphones, cutting-edge laptops, or smart home
        devices, we have something for everyone!
      </p>
      <div className="w-full flex justify-center">
        {/* Scrollable Container */}
        <div className="w-[95%] flex gap-6 overflow-hidden">
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar">
            {menuItems.map((item, index) => (
              <div
                onClick={() =>
                  setCategory((prev) =>
                    prev === item.item_name ? "All" : item.item_name
                  )
                }
                key={index}
                className="flex flex-col items-center justify-center snap-center cursor-pointer"
              >
                {/* Circular Image Wrapper */}
                <div className="w-24 h-24 rounded-full bg-gray-100 shadow-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={item.item_image}
                    alt={item.item_name}
                    className="w-full h-full object-cover"
                    // {category===item.item_name?"w-full h-full object-cover border-2 border-black":"w-full h-full object-cover"}
                  />
                </div>
                <p className="text-sm font-medium mt-2 capitalize">
                  {item.item_name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ItemDisplay category={category} />
    </div>
  );
};

export default ExploreMenu;
