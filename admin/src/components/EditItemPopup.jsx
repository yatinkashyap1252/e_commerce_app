import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditItemPopup = ({ showModal, setShowModal, item, fetchList }) => {
  const [data, setData] = useState({
    name: item.name || "",
    description: item.description || "",
    price: item.price || "",
    category: item.category || "",
    image: item.image || "", // Add image handling here
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!data.name || !data.description || !data.price || !data.category) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("id", item._id);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);

    if (data.image) {
      formData.append("image", data.image); // Append the new image file if provided
    }

    try {
      const response = await axios.put(
        "http://localhost:3000/api/v1/item/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // This tells the server to handle the form data properly
          },
        }
      );

      if (response.data.success) {
        fetchList(); // Fetch the updated list of items
        setShowModal(false); // Close the popup
        toast.success("Item details updated successfully!");
      } else {
        toast.error("Failed to update item!");
      }
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("An error occurred while updating the item.");
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-full sm:w-96">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              X
            </button>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
              Edit Item
            </h2>
            <form onSubmit={onSubmitHandler} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Item Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={onChangeHandler}
                  placeholder="Item Name"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Item Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={data.description}
                  onChange={onChangeHandler}
                  placeholder="Item Description"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={data.price}
                  onChange={onChangeHandler}
                  placeholder="Price"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={data.category}
                  onChange={onChangeHandler}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  required
                >
                  <option value="clothing">Clothing</option>
                  <option value="smart home devices">Home Appliances</option>
                  <option value="books">Books</option>
                  <option value="toys">Toys</option>
                  <option value="sports">Sports</option>
                  <option value="laptops">Laptops</option>
                  <option value="headphones">Headphones</option>
                  <option value="smart watches">Smart Watch</option>
                  <option value="tablets">Tablets</option>
                  <option value="gaming consoles">Gaming Console</option>
                  <option value="cameras">Camera</option>
                  <option value="televison">Television</option>
                  <option value="speakers">Speakers</option>
                  <option value="printers">Printers</option>
                  <option value="projectors">Projectors</option>
                  <option value="vr headsets">VR Headsets</option>
                  <option value="beauty">Beauty</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
                >
                  Update Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditItemPopup;
