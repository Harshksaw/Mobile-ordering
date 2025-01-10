import express from "express";
import dotenv from "dotenv";
import Router from "./routes/v1/index";
import authRouter from "./routes/v1/authRoutes";
import connectDB from "./config/db";
import cors from "cors";
const app = express();
const port = 3001;
dotenv.config({ path: ".env" });
app.use(
  cors({
    // will change in future
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", Router);
app.use("/api/v1/auth", authRouter);
app.get("/", (req, res) => {
  res.send("Hello from Node.js backend!");
});
connectDB();
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
