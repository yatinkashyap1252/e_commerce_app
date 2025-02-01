import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Title from "./shared/Title";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Additem from "./pages/Additem";
import Orders from "./pages/Orders";
import List from "./pages/List";

const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Title Section */}
      <Title />

      {/* Navbar */}
      <Navbar />

      <hr />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        <Routes>
          <Route
            path="/"
            element={
              <div className="flex-1 bg-gray-50 p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                  Project Dashboard
                </h1>
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <h2 className="text-2xl font-bold mb-4 text-blue-600">
                    Project Overview
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    This project is a full-stack application designed to manage
                    items efficiently, offering both administrative and
                    user-friendly functionality. Below are the primary features
                    and functionalities implemented in this system:
                  </p>

                  <h3 className="text-xl font-semibold mb-2 text-gray-700">
                    📋 Key Features:
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 mb-6">
                    <li>
                      View, add, edit, and delete items in a dynamic and
                      responsive interface.
                    </li>
                    <li>
                      Image management with placeholders for missing visuals.
                    </li>
                    <li>
                      Integration with a RESTful API for real-time data
                      handling.
                    </li>
                    <li>
                      Custom modals for editing items with pre-filled data.
                    </li>
                    <li>
                      Toast notifications for user-friendly feedback
                      (success/error messages).
                    </li>
                    <li>
                      Interactive table design with hover and transition
                      effects.
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2 text-gray-700">
                    💻 Technologies Used:
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 mb-6">
                    <li>
                      <strong>Frontend:</strong> React.js with Tailwind CSS for
                      styling.
                    </li>
                    <li>
                      <strong>Backend:</strong> Node.js with Express for API
                      creation.
                    </li>
                    <li>
                      <strong>Database:</strong> MongoDB for data storage.
                    </li>
                    <li>
                      <strong>UI Components:</strong> React-Icons, Toastify for
                      notifications.
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-2 text-gray-700">
                    🚀 Future Enhancements:
                  </h3>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Role-based access control for admins and users.</li>
                    <li>
                      Pagination for large datasets to improve performance.
                    </li>
                    <li>Advanced search and filter functionality.</li>
                    <li>Responsive design improvements for mobile devices.</li>
                  </ul>
                </div>
              </div>
            }
          />
          <Route path="/add" element={<Additem />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
