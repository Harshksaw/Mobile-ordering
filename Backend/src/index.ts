import express from "express";
import dotenv from "dotenv";
import Router from "./routes/v1/index";
import authRouter from "./routes/v1/authRoutes";
import menuRouter from "./routes/v1/menuRoutes";
import connectDB from "./config/db";
import orderRouter from "./routes/v1/orderRoutes";
import cors from "cors";
import http, { createServer } from "http";
import { initializeSocket } from "./socket";
import { getSocketIO } from "./socket";
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
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/order", orderRouter);
app.get("/", (req, res) => {
  res.send("Hello from Node.js backend!");
});
const server = createServer(app);

// Initialize socket with the HTTP server instance
// initializeSocket(server); 

server.listen(port, async () => {
  console.log(`Server listening on port ${port}`);
  await connectDB();
});
