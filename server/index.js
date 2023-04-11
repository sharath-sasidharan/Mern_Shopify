import express from "express";
import connectDB from "./config/connection.js";
import ProductRouter from "./Routes/products.js";
import path from "path";
import cors from "cors";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.use("/uploads", express.static("uploads"));
connectDB();

global.appRoot = path.resolve();
app.use("/api/v1", ProductRouter);

app.listen(5000, () => {
  console.log(`http://localhost:5000`);
});
