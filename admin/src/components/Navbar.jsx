import React from "react";
import ProfileImage from "../assets/profile.jpg";

const Navbar = () => {
  return (
    <header className="w-full p-4 flex justify-between items-center shadow-md bg-white">
      {/* Logo Section */}
      <div className="text-3xl font-bold text-gray-800">
        <p>The Logo.</p>
      </div>

      {/* Profile Image Section */}
      <div className="flex items-center space-x-4">
        <p className="text-gray-600 hidden sm:block">Welcome, User</p>
        <img
          src={ProfileImage}
          alt="User's profile"
          className="w-10 h-10 rounded-full object-cover border border-gray-300"
        />
      </div>
    </header>
  );
};

export default Navbar;