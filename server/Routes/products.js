import express from "express";
import {
  addProduct,
  getProducts,
  getSingleProduct,
  getProductsItems,
} from "../Controllers/product.js";
const router = express.Router();

//! Add Product
router.post("/products/cart-items", getProductsItems);
router.post("/add", addProduct);
router.get("/products", getProducts);
router.get("/product/:id", getSingleProduct);

export default router;
