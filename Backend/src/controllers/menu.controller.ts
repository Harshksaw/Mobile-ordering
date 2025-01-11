import { Request, Response } from 'express';
import { Item, Menu } from '../models';



export const ping = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Pong' });
}
// Get all menu items
export const getAllMenuItems = async (req: Request, res: Response) => {
    try {
        const menuItems = await Menu.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single menu item by ID
export const getMenuItemById = async (req: Request, res: Response) => {
    try {
        const menuItem = await Menu.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new menu item
export const createItem = async (req: Request, res: Response) => {
    const { name, description, price, sizes, options } = req.body;
    const image = req.files.image ? req.files.image : null
    console.log("🚀 ~ createItem ~ req.body:", req.body)
    const item = new Item({ name, description, price, sizes, options, image });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all items
export const getAllItems = async (req: Request, res: Response) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing menu item
// Delete a menu item
export const deleteMenuItem = async (req: Request, res: Response) => {
    try {
        const deletedMenuItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json({ message: 'Menu item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Export all controllers as default
export default {
    ping,
    getAllMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
};