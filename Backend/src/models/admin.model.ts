import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { configDotenv } from "dotenv";
interface IAdmin extends Document {
  username: string;
  password: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  getJwtToken(): string;
  comparePassword: (password: string) => Promise<boolean>;
}
configDotenv();
const AdminSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: "admin" },
    // socketId: { type: String },
    // no need of below is included in timestamps
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
  }
);

AdminSchema.pre<IAdmin>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    // hashing the password
    if (!this.password) {
      throw new Error("password is required");
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    console.log(err);
  }
});

AdminSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

AdminSchema.methods.getJwtToken = async function () {
  if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_TIME) {
    throw new Error("JWT_SECRET or JWT_EXPIRES_TIME is not defined");
  }
  const token = sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });

  return token;
};

export default model<IAdmin>("Admin", AdminSchema);
