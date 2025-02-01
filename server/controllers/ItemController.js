import fs from "fs";
import ItemModel from "../models/itemSchema.js";

export const addItem = async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill the full form!",
      });
    }

    let image_filename = "";
    if (req.file && req.file.filename) {
      image_filename = req.file.filename;
    } else {
      return res.status(400).json({
        success: false,
        message: "Please upload an image!",
      });
    }

    // Check for duplicates
    const existingItem = await ItemModel.findOne({ name, description });
    if (existingItem) {
      return res.status(409).json({
        success: false,
        message: "This item already exists in the database!",
      });
    }

    // Create a new ItemModel instance
    const food = new ItemModel({
      name,
      description,
      price,
      category,
      image: image_filename,
    });

    // Save the item to the database
    await food.save();

    // Send a success response
    return res.status(201).json({
      success: true,
      message: "Item added successfully!",
    });
  } catch (error) {
    // Handle unexpected errors
    console.error("Error adding item:", error);
    return res.status(500).json({
      success: false,
      message:
        "An error occurred while adding the item. Please try again later.",
    });
  }
};

export const getListItem = async (req, res, next) => {
  try {
    const item = await ItemModel.find({});
    return res.status(200).json({
      success: true,
      message: "List fetched successfully",
      item,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error occurred",
    });
  }
};

export const removeItem = async (req, res, next) => {
  try {
    // Validate the presence of ID
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: "ID is required to delete an item!",
      });
    }

    // Find and delete the item
    const item = await ItemModel.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found with this ID!",
      });
    }

    fs.unlink(`uploads/${item.image}`, () => {});

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      item,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred!",
    });
  }
};

// Controller function for updating an item
export const updateItem = async (req, res) => {
  const { id, name, description, price, category } = req.body;
  let imageUrl = req.body.image; // Get the image URL from the request body

  if (req.file) {
    // If there is a new image file, replace the old one
    const oldItem = await ItemModel.findById(id);
    if (oldItem.image) {
      const oldImagePath = path.join("uploads", oldItem.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Remove the old image from the filesystem
      }
    }
    imageUrl = req.file.filename; // Set the new image filename
  }

  try {
    const updatedItem = await ItemModel.findByIdAndUpdate(
      id,
      { name, description, price, category, image: imageUrl },
      { new: true }
    );
    res.json({
      success: true,
      item: updatedItem,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update the item.",
    });
  }
};