const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Momos", "Shawarma"
  categories: [{ 
    name: { type: String, required: true }, // e.g., "Veg", "Chicken" 
    items: [{
      name: { type: String, required: true }, // e.g., "Paneer Momos"
      description: { type: String }, // Optional description
      price: { 
        type: Number, 
        required: true,
        // You could add validation for price to be positive
        validate: {
          validator: function(value) {
            return value > 0;
          },
          message: 'Price must be a positive number'
        }
      },
      sizes: [{  // For different sizes like "half/full"
        name: { type: String }, 
        price: { type: Number } 
      }],
      options: [{ // For things like extra cheese, spice levels
        name: { type: String },
        price: { type: Number }
      }],
      image: { type: String } // URL to an image of the item
    }]
  }]
});

const Menu = mongoose.model('Menu', menuSchema);