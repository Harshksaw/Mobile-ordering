// filepath: /Users/harshsaw/Documents/GitHub/Mobile-ordering/Backend/src/models/item.model.ts
import mongoose, { Schema, Document } from 'mongoose';

interface ISize {
  name: string;
  price: number;
}

interface IOption {
  name: string;
  price: number;
}

export interface IItem extends Document {
  name: string;
  description?: string;
  price?: number;
  sizes?: ISize[];
  options?: IOption[];
  image?: string;
}

const itemSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: {
    type: Number,
    validate: {
      validator: function(value: number) {
        return value > 0;
      },
      message: 'Price must be a positive number'
    }
  },
  sizes: [{
    name: { type: String },
    price: {
      type: Number,
      required: function() { return this.name != null; },
      validate: {
        validator: function(value: number) {
          return value > 0;
        },
        message: 'Price must be a positive number'
      }
    }
  }],
  options: [{
    name: { type: String },
    price: { type: Number }
  }],
  image: { type: String }
});

export default mongoose.model<IItem>('Item', itemSchema);