import { Request, Response } from 'express';
import { Category, Item } from '../models';

// Ping route
 const ping = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Pong' });
};

// Get all menu items
 const getAllMenuItems = async (req: Request, res: Response) => {
    try {
        const menuItems = await Item.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// Get a single menu item by ID
 const getMenuItemById = async (req: Request, res: Response) => {
    try {
        const menuItem = await Item.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// Create a new menu item
 const createItem = async (req: Request, res: Response) => {
    const { name, description, price, sizes, options } = req.body;
    const image = (req as any).files?.image ? (req as any).files.image : null;
    console.log("🚀 ~ createItem ~ req.body:", req.body);
    const item = new Item({ name, description, price, sizes, options, image });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

// Get all items
 const getAllItems = async (req: Request, res: Response) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// Update an existing menu item
 const updateMenuItem = async (req: Request, res: Response) => {
    try {
        const updatedMenuItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
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
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json({ message: 'Menu item deleted' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// Create a new category
 const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
        const category = new Category({ name, items: [] });
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

 export {
    ping,
    createItem,
    getAllItems,
    updateMenuItem,
    deleteMenuItem,
    createCategory
}