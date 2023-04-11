import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017", {
      dbName: "Ecommerce_Product_API",
    })
    .then(() => {
      console.log("Db connection success");
    })
    .catch((err) => {
      console.log("Error connecting to DB: " + err);
    });
};

export default connectDB;
