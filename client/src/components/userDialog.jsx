import { useState, useEffect } from "react";

const DropdownMenu = ({ token, logoutHandler }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setMenuOpen(false); // Close menu if clicking outside
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {!token ? (
        <button
          className="flex items-center gap-2 p-2 border-2 border-gray-300 rounded-md hover:border-gray-500 transition duration-200"
          onClick={logoutHandler}
        >
          <p className="text-sm md:text-xl">Sign-in</p>
          <FaArrowRightToBracket className="text-lg" />
        </button>
      ) : (
        <div className="relative dropdown-container">
          <img
            src="/path/to/profile-icon.png"
            alt="Profile icon"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={toggleMenu}
          />
          {menuOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <p>Orders</p>
              </li>
              <hr className="border-gray-300" />
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  closeMenu();
                  logoutHandler();
                }}
              >
                <p>Logout</p>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
