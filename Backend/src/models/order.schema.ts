import mongoose, { Document } from "mongoose";
import Counter from "./counter.schema";

interface IOrder extends Document {
  items: {
    item: mongoose.Schema.Types.ObjectId;
    quantity: number;
    price: number;
    name: string;
  }[];
  status: string;
  token: number;
  clientId: string;
  totalAmount: number;
  customerName: string;
  customerPhone: string;
}

const orderItemSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { _id: false }
); // Prevent Mongoose from creating _id for subdocuments

const orderSchema = new mongoose.Schema<IOrder>(
  {
    clientId: {
      type: String,
      required: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: function (v: any[]) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "Order must have at least one item",
      },
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled", "pickedUp"],
      default: "pending",
    },
    token: {
      type: Number,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    customerPhone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre<IOrder>("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: "orderToken" },
        { $inc: { value: 1 } },
        { new: true, upsert: true }
      );
      this.token = counter.value;
      next();
    } catch (error) {
      next(error as Error);
    }
  } else {
    next();
  }
});

export const Order = mongoose.model<IOrder>("Order", orderSchema);
