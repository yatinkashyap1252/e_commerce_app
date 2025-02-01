import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddItem = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Create a new FormData instance
    const formdata = new FormData();

    // Append all data fields to FormData
    formdata.append("name", data.name);
    formdata.append("description", data.description);
    formdata.append("price", data.price);
    formdata.append("category", data.category);

    // Append the image file (selected by the user)
    const imageFile = document.querySelector("#image").files[0];
    if (!imageFile) {
      toast.error("Please upload an image.");
      return;
    }
    formdata.append("image", imageFile); // Ensure "image" matches the backend's expected field name

    try {
      // Make the POST request
      const response = await axios.post(
        "http://localhost:3000/api/v1/item/add",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Inform server about the form data
          },
        }
      );

      if (response.data.success) {
        // Reset form fields on success
        setData({ name: "", description: "", price: "", category: "" });
        setImagePreview(""); // Clear image preview
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-4 w-full mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Add Item</h2>
      <form onSubmit={onSubmitHandler} className="space-y-6">
        {/* Upload Image */}
        <div>
          <label htmlFor="image" className="block font-medium mb-2">
            Upload Image
          </label>
          <label
            htmlFor="image"
            className="w-32 h-32 bg-gray-100 border border-dashed border-gray-400 rounded-md flex items-center justify-center cursor-pointer overflow-hidden"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400">Click to upload</span>
            )}
          </label>
          <input
            type="file"
            id="image"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block font-medium mb-2">
            Product Name
          </label>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            id="name"
            name="name"
            placeholder="Enter Name"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Product Description */}
        <div>
          <label htmlFor="description" className="block font-medium mb-2">
            Product Description
          </label>
          <textarea
            value={data.description}
            onChange={onChangeHandler}
            id="description"
            name="description"
            rows="6"
            placeholder="Write content here"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Category and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block font-medium mb-2">
              Category
            </label>
            <select
              onChange={onChangeHandler}
              value={data.category}
              id="category"
              name="category"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
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

          <div>
            <label htmlFor="price" className="block font-medium mb-2">
              Product Price
            </label>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              id="price"
              name="price"
              placeholder="Enter Price"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              min="0"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
