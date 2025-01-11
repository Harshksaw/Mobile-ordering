import { Request, Response } from "express";
import { Category, Item } from "../models";
import cloudinary from "../config/cloudinary";

// Ping route
const ping = (req: Request, res: Response) => {
  res.status(200).json({ message: "Pong" });
};
// filepath: /Users/harshsaw/Documents/GitHub/Mobile-ordering/Backend/src/config/cloudinaryConfig.ts
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Get all menu items

// Get a single menu item by ID

// Create a new menu item

const createItem = async (req: Request, res: Response) => {
  const { name, description, price, sizes, options } = req.body;
  //   const image = (req as any).file ? (req as any).file.image : null;
  const image = req.file;
  //   console.log("🚀 ~ createItem ~ req.body:", req.body);
  console.log(image);
  //   console.log(req.image);
  let imageUrl = "";

  //   const result = await cloudinary.uploader.upload(req?.file?.path, {
  //     folder: "menu_items",
  //   });
  //   console.log("result us ", result);
  //   imageUrl = result.secure_url;
  //   if (req.file && req.file.path) {
  try {
    console.log("inside this");
    // Convert the file buffer to a base64 string
    //   @ts-ignore
    const base64Image = `data:${image.mimetype};base64,${image.buffer.toString(
      "base64"
    )}`;
    //   @ts-ignore
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "menu_items",
    });
    // console.log("result is ", result);
    imageUrl = result.secure_url;
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Image upload failed", error });
  }
  //   }

  const item = new Item({
    name,
    description,
    price,
    sizes,
    options,
    image: imageUrl,
  });

  try {
    const newItem = await item.save();
    res.status(201).json({
      success: true,
      message: "create item success",
      newItem,
    });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }

};

// Get all items
const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find();
    res.status(200).json({ success: true, items });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const getMenuItemById = async (req: Request, res: Response) => {
  try {
    const menuItem = await Item.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Update an existing menu item
const updateMenuItem = async (req: Request, res: Response) => {
  try {
    const updatedMenuItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMenuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json(updatedMenuItem);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Delete a menu item
const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const deletedMenuItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedMenuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json({ message: "Menu item deleted" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Create a new category
const createCategory = async (req: Request, res: Response) => {
  const { name } = req.params;

  try {
    const category = new Category({ name, items: [] });
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({
      success: true,
      message: "categories fetched",
      categories,
    });
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
};
export const addItemToCategory = async (req: Request, res: Response) => {
  const { categoryId, itemId } = req.body;

  try {
    // Find the category by ID
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Find the item by ID
    const item = await Item.findById(itemId);
    console.log("🚀 ~ addItemToCategory ~ item:", item);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Add the item to the category
    category.items.push(item);

    // Save the updated category
    await category.save();

    res.status(200).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const getItemsFromCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const { fields } = req.query;

  try {
    // Convert fields query parameter to a space-separated string
    const selectFields = fields
      ? (fields as string).split(",").join(" ")
      : "name price";

    // Find the category by ID and populate items with specific fields
    const category = await Category.findById(categoryId).populate({
      path: "items",
      select: selectFields,
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category.items);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export {
  ping,
  createItem,
  getAllItems,
  updateMenuItem,
  deleteMenuItem,
  getMenuItemById,
  createCategory,
  getItemsFromCategory,
};
