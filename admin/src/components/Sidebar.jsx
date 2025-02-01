import React from "react";
import { TbShoppingCartCheck } from "react-icons/tb";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlinePlaylistAddCheckCircle } from "react-icons/md";
import { FiHome } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="h-full bg-gray-100 shadow-md p-4 transition-all duration-300">
      {/* Sidebar Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 hidden md:block">
          Dashboard
        </h2>
      </div>

      {/* Navigation Items */}
      <ul className="space-y-4">
        {/* Home */}
        <hr/>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center space-x-3 text-gray-700 hover:text-blue-600 cursor-pointer ${
                isActive ? "text-blue-600 font-bold " : ""
              }`
            }
          >
            <FiHome size={24} />
            <span className="font-medium hidden md:inline">Home</span>
          </NavLink>
        </li>
        <hr/>

        {/* Add Item */}
        <hr/>
        <li>
          <NavLink
            to="/add"
            className={({ isActive }) =>
              `flex items-center space-x-3 text-gray-700 hover:text-blue-600 cursor-pointer ${
                isActive ? "text-blue-600 font-bold" : ""
              }`
            }
          >
            <IoIosAddCircleOutline size={24} />
            <span className="font-medium hidden md:inline">Add Item</span>
          </NavLink>
        </li>
        <hr/>

        {/* List Item */}
        <hr/>
        <li>
          <NavLink
            to="/list"
            className={({ isActive }) =>
              `flex items-center space-x-3 text-gray-700 hover:text-blue-600 cursor-pointer ${
                isActive ? "text-blue-600 font-bold" : ""
              }`
            }
          >
            <MdOutlinePlaylistAddCheckCircle size={24} />
            <span className="font-medium hidden md:inline">List Item</span>
          </NavLink>
        </li>
        <hr/>

        {/* Orders */}
        <hr/>
        <li>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `flex items-center space-x-3 text-gray-700 hover:text-blue-600 cursor-pointer ${
                isActive ? "text-blue-600 font-bold" : ""
              }`
            }
          >
            <TbShoppingCartCheck size={24} />
            <span className="font-medium hidden md:inline">Orders</span>
          </NavLink>
        </li>
        <hr/>
      </ul>
    </nav>
  );
};

export default Sidebar;
