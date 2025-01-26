import mongoose, { Document } from "mongoose";
import Counter from "./counter.schema";
const Schema = mongoose.Schema;
interface IOrder extends Document {
  items: {
    item: mongoose.Schema.Types.ObjectId;
    size: string;
    price: number;
  }[];
  status: string;
  token: number;
  clientId: string;
}

const orderItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true
  },
  items: [orderItemSchema],
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: "orderToken" },
        { $inc: { value: 1 } },
        { new: true, upsert: true }
      );
      this.token = counter.value;
    } catch (error) {
      throw Error(error as any);
      next();
    }
  } else {
    next();
  }
});

export const Order = mongoose.model("Order", orderSchema);
