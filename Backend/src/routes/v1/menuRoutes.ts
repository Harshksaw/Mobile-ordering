const express = require("express");

import { v2 as cloudinary } from 'cloudinary';



const MenuRouter = express.Router();
import dotenv from 'dotenv';

dotenv.config();
import  MenuController  from "../../controllers/menu.controller";
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

  
  // Configure Multer storage using Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "menu-items",
      resource_type: "auto",
    },
})
const upload = multer({ storage: storage });


MenuRouter.get("/ping", MenuController.ping);
MenuRouter.post("/add", upload.single('image'), MenuController.createMenuItem);
MenuRouter.get("/list", MenuController.getAllMenuItems);
MenuRouter.get("/:id", MenuController.getMenuItemById);
MenuRouter.put("/:id", upload.single('image'), MenuController.updateMenuItem);
MenuRouter.delete("/:id", MenuController.deleteMenuItem);



module.exports = MenuRouter;
