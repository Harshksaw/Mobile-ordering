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
const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
        size: { type: String, required: true },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      // will be changed
      enum: ["processing", "completed ", "cancelled"],
      default: "processsing",
      required: true,
    },
    token: { type: Number },
    clientId: { type: String, required: true }, // Add clientId field to the schema
  },
  {
    timestamps: true,
  }
);

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
const Order = mongoose.model("Order", orderSchema);

export default Order;
