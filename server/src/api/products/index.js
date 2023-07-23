import { productModel } from "../../database/productModel";
const multer = require("multer");
import path from "path";
import express from "express";
const Router = express.Router();
const fs = require("fs");
import { v2 as cloudinary } from "cloudinary";
import { AsyncLocalStorage } from "async_hooks";

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

});
Router.post("/addProduct", upload.fields([{ name: "image", maxCount: 10 }, { name: "logo", maxCount: 2 }]), async (req, res, next) => {
  try {

    const imageUrl = [];

    const uploadPromises = [];
    //  console.log(req.files.image);
    for (var i = 0; i < req.files.image?.length; i++) {
      const filePath = req.files.image[i].path;
      const uploadPromise = new Promise((resolve, reject) => {
        cloudinary.uploader.upload(filePath, { folder: 'products' }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.secure_url);
          }
        });
      });

      uploadPromises.push(uploadPromise);
    }
    let specs = [];
    req.body.specification.forEach((s) => {
      specs.push(s)
    });
    req.body.specification = specs;
    // console.log(req.files.logo.path)
    const filepath = req.files.logo[0].path;
    // console.log(filepath);
    const brandlogo = await cloudinary.uploader.upload(filepath, {
      folder: "brands"
    });
    // console.log(req.body.brandName);

    req.body.brand = {
      Name: req.body.brandName,
      logo: brandlogo.secure_url
    }
   
    console.log(req.body.brand);
    (async () => {
      try {
        const results = await Promise.all(uploadPromises);
        imageUrl.push(...results);
        req.body.image = imageUrl;
        // console.log(req.body);
        // const newProduct = await productModel.create({
        //   title: req.body.title,
        //   price: req.body.price,
        //   isOffer: req.body.isOffer,
        //   offerPrice: req.body.offerPrice,
        //   description: req.body.description,
        //   category: req.body.category,
        //   quantity: req.body.quantity,
        //   image: imageUrl,
        //   key:req.body.key,
        //   Highlights:req.body.Highlights,
        //   specification:req.body.specification
        // });
        const newProduct = await productModel.create(req.body)

        return res.status(201).json({ status: "product added", newProduct });
        // Handle the newProduct as needed

      } catch (error) {
        console.log(error);
      }
    })();


  }
  catch (error) {
    return res.status(500).json({ message: error.message, status: "failed" });
  }
});



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
    // console.log(category);
    const product = await productModel.find({ category });
    if (product.length === 0) {
      return res.json({ error: "category not found" });
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
      description:new RegExp(searchString,"i")
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
Router.get("/getProductById/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    // console.log(_id);
    const product = await productModel.findById(_id);
    if (!product) {
      res.json({ error: "product not found" });
    }
// console.log(product);
    return res.status(200).json({ status: "success", product });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error });
  }
});

export default Router;
