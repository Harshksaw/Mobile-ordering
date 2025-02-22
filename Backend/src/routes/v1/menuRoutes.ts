const express = require("express");

import { v2 as cloudinary } from "cloudinary";

const MenuRouter = express.Router();
import dotenv from "dotenv";

import multer from "multer";
dotenv.config();
import {
  createCategory,
  ping,
  updateMenuItem,
  deleteMenuItem,
  createItem,
  getAllItems,
  getAllCategory,
  addItemsToCategory,
} from "../../controllers/menu.controller";
// import multer from 'multer';
// const multer = require('multer');
// import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Configure Multer storage using Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "menu-items",
//     resource_type: "auto",
//   },
// });
// const upload = multer({ storage: storage });
// const multerS = multer({ storage: multer.memoryStorage() });
const upload = multer({ storage: multer.memoryStorage() });

MenuRouter.get("/ping", ping);

MenuRouter.post("/addMenuItem", upload.single("image"), createItem);

MenuRouter.get("/getAllMenuItems", getAllItems);
MenuRouter.get("/getAllCategory", getAllCategory);
MenuRouter.post("/createCategory/:name", createCategory);
// MenuRouter.put("/:id", upload.single('image'), MenuController.updateMenuItem);
MenuRouter.post("/addItemToCategory", addItemsToCategory);
MenuRouter.post("/deleteMenuItem/:id", deleteMenuItem);

export default MenuRouter;
