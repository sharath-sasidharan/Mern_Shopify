import Product from "../models/Product.js";
import multer from "multer";
import path from "path";
import Joi from "joi";
import fs from "fs";

//!setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "/uploads"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

//!Handle multipart form-Data

const handleMultipartFormData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("image");

//! Add Product
const addProduct = async (req, res, next) => {
  handleMultipartFormData(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
    const filePath = req.file.path;

    //! Validation
    const productSchema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      size: Joi.string().required(),
    });

    const { error } = productSchema.validate(req.body);
    if (error) {
      //! delete the uploaded file
      if (req.file) {
        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          if (err) {
            return res.status(400).json({
              message: err.message,
            });
          }
        });
      }

      //! JOI ERROR
      return res.status(400).json({
        message: "Fields required",
      });
    }

    const { name, price, size } = req.body;
    let docuemnt;
    try {
      docuemnt = await Product.create({
        name,
        price,
        size,
        image: filePath,
      });
    } catch (err) {}

    res.status(200).json({
      success: true,
      docuemnt,
    });
  });
};

//! Get Products
const getProducts = async (req, res, next) => {
  try {
    let products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    console.log(err);
  }
};

//! Get Single Product
const getSingleProduct = async (req, res, next) => {
  try {
    const product_id = req.params.id;

    let product = await Product.findById(product_id);

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {}
};

//! Products in carts

const getProductsItems = async (req, res, next) => {
  let documents;
  try {
    documents = await Product.find({
      _id: { $in: req.body.ids },
    });
    return res.json(documents);
  } catch (err) {}
};

export { addProduct, getProducts, getSingleProduct, getProductsItems };
