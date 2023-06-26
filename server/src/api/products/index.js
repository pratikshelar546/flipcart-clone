import { productModel } from "../../database/productModel";
const multer = require("multer");
import path from "path";
import express from "express";
const Router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    cb(null, true);
  }
  cb(null, false);
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  // fileFilter: fileFilter,
});
Router.post("/addProduct",upload.fields([{ name: "image", maxCount: 10 },]), async (req, res, next) => {
  try {
    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.image?.length; i++) {
        reqFiles.push(url + '/public/' + req.files.image[i].filename);
    }
console.log(req.files);
    const newProduct = await productModel.create({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      quantity:req.body.quantity,
      image: reqFiles,
      rating: req.body.rating,
    });

    return res.status(201).json({ status: "product added", newProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: "failed" });
  }
});

// update product


// get all products
Router.get("/getProduct", async (req, res) => {
  try {
    const products = await productModel.find();
    return res.status(200).json({ status: "success", products });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error });
  }
});

// get product by category
Router.get("/getProduct/:category", async (req, res) => {
  try {
    const { category } = req.params;
    console.log(category);
    const product = await productModel.find({ category });
    if(product.length === 0){
      return res.json({error : "category not found"});
    }
    return res.status(200).json({ status: "success", product });
  } catch (error) {
    return res.status(500).json({ status: "failed", error: error.message });
  }
});

Router.get("/getProduct/search/:searchString", async (req, res) => {
  try {
    const { searchString } = req.params;
    const product = await productModel.find({
      title: new RegExp(searchString, "i"),
    });

    if (product.length === 0) {
      return res.json({ error: "Product not found" });
    }
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});



// get product by id
Router.get("/getProduct/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(_id);
    const product = await productModel.findById(_id);
    if (!product) {
      res.json({ error: "product not found" });
    }

    return res.status(200).json({ status: "success", product });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error });
  }
});

export default Router;
