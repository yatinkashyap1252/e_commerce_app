import React, { useContext, useState, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaBars } from "react-icons/fa";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import ProfileImage from "../assets/profile.jpg";

const Header = ({ setShowLogin }) => {
  const { subTotal, token, setToken } = useContext(StoreContext);
  const [menu, setMenu] = useState("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // console.log(token)

  const homeHandler = () => {
    setMenu("home");
    navigate("/");
    setDrawerOpen(false);
  };

  const categoryHandler = () => {
    setMenu("category");
    navigate("/category");
    setDrawerOpen(false);
  };

  const aboutHandler = () => {
    setMenu("about");
    navigate("/about");
    setDrawerOpen(false);
  };

  const logoutHandler = () => {
    setToken(null);
    setShowLogin(true);
    setDropdownOpen(false);
    setDrawerOpen(false);
  };

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div className="w-full h-20 p-5 flex justify-between items-center shadow-md bg-white relative">
      {/* Logo */}
      <Link to="/">
        <p className="text-2xl md:text-3xl font-extrabold cursor-pointer">
          Logo
        </p>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex w-7/12 justify-between items-center gap-8">
        <ul className="flex items-center gap-6 font-semibold text-lg">
          <Link
            to="/"
            onClick={homeHandler}
            className={`${
              menu === "home"
                ? "border-b-2 border-b-slate-800"
                : "cursor-pointer hover:text-blue-600"
            }`}
          >
            Home
          </Link>
          <li
            onClick={categoryHandler}
            className={`${
              menu === "category"
                ? "border-b-2 border-b-slate-800"
                : "cursor-pointer hover:text-blue-600"
            }`}
          >
            Category
          </li>
          <li
            onClick={aboutHandler}
            className={`${
              menu === "about"
                ? "border-b-2 border-b-slate-800"
                : "cursor-pointer hover:text-blue-600"
            }`}
          >
            About
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <div className="p-2 hover:bg-slate-400 rounded-full transition-all cursor-pointer">
            <FaSearch />
          </div>
          <Link to="/cart">
            <div className="relative flex p-2 hover:bg-slate-400 rounded-full transition-all cursor-pointer">
              <FaShoppingCart />
              {subTotal > 0 && (
                <div className="w-2 h-2 rounded-full bg-green-400 absolute top-0 right-0" />
              )}
            </div>
          </Link>

          {!token ? (
            <button
              className="flex items-center gap-2 p-2 border-2 border-gray-300 rounded-md hover:border-gray-500 transition duration-200"
              onClick={() => setShowLogin(true)}
            >
              <p className="text-sm md:text-xl">Sign-in</p>
              <FaArrowRightToBracket className="text-lg" />
            </button>
          ) : (
            <div
              className="relative dropdown-container"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={ProfileImage}
                alt="Profile icon"
                className="w-10 h-10 rounded-full bg-cover cursor-pointer"
              />
              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 z-20 bg-white shadow-lg rounded-md border border-gray-200">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/order")}
                  >
                    Orders
                  </li>
                  <hr className="border-gray-300" />
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={logoutHandler}
                  >
                    Logout
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div
        className="md:hidden p-2 hover:bg-slate-400 rounded-full transition-all cursor-pointer"
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        <FaBars />
      </div>

      {/* Drawer for Mobile */}
      {drawerOpen && (
        <div className="fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg z-50 flex flex-col justify-between overflow-y-auto">
          {/* Drawer Top Section */}
          <div className="p-5">
            <p className="text-3xl font-extrabold mb-8">Logo</p>
            <ul className="flex flex-col gap-4 font-semibold text-lg">
              <li
                onClick={homeHandler}
                className={`${
                  menu === "home" ? "text-slate-800" : "cursor-pointer"
                }`}
              >
                Home
              </li>
              <li
                onClick={categoryHandler}
                className={`${
                  menu === "category" ? "text-slate-800" : "cursor-pointer"
                }`}
              >
                Category
              </li>
              <li
                onClick={aboutHandler}
                className={`${
                  menu === "about" ? "text-slate-800" : "cursor-pointer"
                }`}
              >
                About
              </li>
            </ul>
          </div>

          {/* Drawer Bottom Section */}
          <div className="p-5 border-t border-gray-300">
            <button
              className="w-full flex items-center justify-center gap-2 p-2 border-2 rounded-md"
              onClick={logoutHandler}
            >
              <p className="text-lg">Logout</p>
              <FaArrowRightToBracket />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;