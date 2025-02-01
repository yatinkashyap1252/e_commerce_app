import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaTrashAlt, FaEdit, FaChevronDown, FaChevronUp } from "react-icons/fa";
import EditItemPopup from "../components/EditItemPopup";

const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);

  const fetchList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/item/getlist"
      );

      if (response.data.success) {
        setList(response.data.item);
      } else {
        toast.error("An error occurred while fetching the list.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch the item list. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/item/remove/${id}`
      );
      if (response.data.success) {
        toast.success("Item deleted successfully!");
        setList((prevList) => prevList.filter((item) => item._id !== id));
      } else {
        toast.error("Failed to delete the item.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete the item. Please try again.");
    }
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const toggleRow = (id) => {
    setExpandedRow((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="p-6 w-full mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Item Management
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="animate-bounce">Loading...</span>
        </div>
      ) : list.length === 0 ? (
        <p className="text-gray-500 text-center">No items available.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4 overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr className="animate-fadeIn">
                <th className="p-4 text-left font-medium text-gray-700">
                  Image
                </th>
                <th className="p-4 text-left font-medium text-gray-700">
                  Name
                </th>
                <th className="p-4 text-left font-medium text-gray-700">
                  Price
                </th>
                <th className="p-4 text-left font-medium text-gray-700">
                  Category
                </th>
                <th className="p-4 text-left font-medium text-gray-700">
                  Edit
                </th>
                <th className="p-4 text-center font-medium text-gray-700">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <React.Fragment key={item._id}>
                  <tr className="border-b hover:bg-gray-50 transition-transform transform hover:scale-105">
                    <td className="p-4">
                      <img
                        src={
                          `http://localhost:3000/api/v1/images/${item.image}` ||
                          "/placeholder.jpg"
                        }
                        alt={item.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                    </td>
                    <td className="p-4 text-gray-800 font-medium">
                      {item.name}
                    </td>
                    <td className="p-4 text-gray-600">${item.price}</td>
                    <td className="p-4 text-gray-600">{item.category}</td>
                    <td className="p-4">
                      <button
                        className="text-blue-600 hover:text-blue-800 transition-all"
                        onClick={() => openEditModal(item)}
                      >
                        <FaEdit className="inline-block w-5 h-5" />
                      </button>
                    </td>
                    <td className="p-4 text-center space-x-2">
                      <button
                        className="text-red-600 hover:text-red-800 transition-all"
                        onClick={() => deleteItem(item._id)}
                      >
                        <FaTrashAlt className="inline-block w-5 h-5" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-800 transition-all"
                        onClick={() => toggleRow(item._id)}
                      >
                        {expandedRow === item._id ? (
                          <FaChevronUp className="inline-block w-5 h-5" />
                        ) : (
                          <FaChevronDown className="inline-block w-5 h-5" />
                        )}
                      </button>
                    </td>
                  </tr>

                  {expandedRow === item._id && (
                    <tr className="animate-slideDown">
                      <td colSpan="6" className="p-4 bg-gray-50">
                        <div>
                          <p className="text-gray-700">
                            <strong>Details:</strong>{" "}
                            {item.description || "No details available"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && selectedItem && (
        <EditItemPopup
          showModal={showModal}
          setShowModal={setShowModal}
          item={selectedItem}
          fetchList={fetchList}
        />
      )}
    </div>
  );
};

export default List;
