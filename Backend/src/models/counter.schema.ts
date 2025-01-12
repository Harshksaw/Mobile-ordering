import mongoose from "mongoose";
interface ICounter extends mongoose.Document {
  name: string;
  value: number;
}
const counterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    value: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true }
);

const Counter = mongoose.model<ICounter>("Counter", counterSchema);

export default Counter;
