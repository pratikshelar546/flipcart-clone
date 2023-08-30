"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _productModel = require("../../database/productModel");
var _path = _interopRequireDefault(require("path"));
var _express = _interopRequireDefault(require("express"));
var _cloudinary = require("cloudinary");
var _async_hooks = require("async_hooks");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const multer = require("multer");
const Router = _express.default.Router();
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + _path.default.extname(file.originalname));
  }
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
    fileSize: 1024 * 1024 * 5
  }
});
Router.post("/addProduct", upload.fields([{
  name: "image",
  maxCount: 10
}, {
  name: "logo",
  maxCount: 2
}]), async (req, res, next) => {
  try {
    const imageUrl = [];
    const uploadPromises = [];
    //  console.log(req.files.image);
    for (var i = 0; i < req.files.image?.length; i++) {
      const filePath = req.files.image[i].path;
      const uploadPromise = new Promise((resolve, reject) => {
        _cloudinary.v2.uploader.upload(filePath, {
          folder: 'products'
        }, (err, result) => {
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
    req.body.specification.forEach(s => {
      specs.push(s);
    });
    req.body.specification = specs;
    // console.log(req.files.logo.path)
    const filepath = req.files.logo[0].path;
    // console.log(filepath);
    const brandlogo = await _cloudinary.v2.uploader.upload(filepath, {
      folder: "brands"
    });
    // console.log(req.body.brandName);

    req.body.brand = {
      Name: req.body.brandName,
      logo: brandlogo.secure_url
    };
    console.log("");
    (async () => {
      try {
        const results = await Promise.all(uploadPromises);
        imageUrl.push(...results);
        req.body.image = imageUrl;
        console.log("");
        const newProduct = await _productModel.productModel.create(req.body);
        return res.status(201).json({
          status: "product added",
          newProduct
        });
        // Handle the newProduct as needed
      } catch (error) {
        return res.status(500).json({
          status: "Failed",
          error: error.message
        });
      }
    })();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: "failed"
    });
  }
});

// update product
Router.put("/updateProduct/:id", upload.fields([{
  name: "image",
  maxCount: 10
}, {
  name: "logo",
  maxCount: 2
}]), async (req, res, next) => {
  try {
    const {
      id
    } = req.params;

    // const product = await productModel.findOne({_id:id});
    // if(!product){
    //   return res.json(404).json({status:"Product Not found"});
    // }
    const imageUrl = [];
    const uploadPromises = [];
    //  console.log(req.files.image);
    for (var i = 0; i < req.files.image?.length; i++) {
      const filePath = req.files.image[i].path;
      const uploadPromise = new Promise((resolve, reject) => {
        _cloudinary.v2.uploader.upload(filePath, {
          folder: 'products'
        }, (err, result) => {
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
    req.body.specification.forEach(s => {
      specs.push(s);
    });
    req.body.specification = specs;
    const filepath = req.files.logo[0].path;
    // console.log(filepath);
    const brandlogo = await _cloudinary.v2.uploader.upload(filepath, {
      folder: "brands"
    });
    // console.log(req.body.brandName);

    req.body.brand = {
      Name: req.body.brandName,
      logo: brandlogo.secure_url
    }(async () => {
      try {
        const results = await Promise.all(uploadPromises);
        imageUrl.push(...results);
        req.body.image = imageUrl;
        const updatedProduct = await _productModel.productModel.findOneAndUpdate({
          _id: id
        }, req.body, {
          new: true
        });
        return res.status(201).json({
          status: "product updated",
          updatedProduct
        });
        // Handle the newProduct as needed
      } catch (error) {
        return res.status(500).json({
          status: "Failed",
          error: error.message
        });
      }
    })();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: "failed"
    });
  }
});
Router.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    await _productModel.productModel.findOneAndRemove({
      _id: id
    });
    return res.status(200).json({
      status: "success",
      message: "product deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      status: "falied",
      error: error.message
    });
  }
});
// get all products

Router.get("/getProduct", async (req, res) => {
  try {
    const products = await _productModel.productModel.find();
    return res.status(200).json({
      status: "success",
      products
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error
    });
  }
});
Router.get("/getProdductByAdmin/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const products = await _productModel.productModel.find({
      admin: id
    });
    return res.status(200).json({
      products
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      error: error.message
    });
  }
});
// get product by category
Router.get("/getProduct/:category", async (req, res) => {
  try {
    const {
      category
    } = req.params;
    // console.log(category);
    const product = await _productModel.productModel.find({
      category
    });
    if (product.length === 0) {
      return res.json({
        error: "category not found"
      });
    }
    return res.status(200).json({
      status: "success",
      product
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      error: error.message
    });
  }
});
Router.get("/getProduct/search/:searchString", async (req, res) => {
  try {
    const {
      searchString
    } = req.params;
    const product = await _productModel.productModel.find({
      title: new RegExp(searchString, "i"),
      description: new RegExp(searchString, "i")
    });
    if (product.length === 0) {
      return res.json({
        error: "Product not found"
      });
    }
    return res.status(200).json({
      product
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

// get product by id
Router.get("/getProductById/:_id", async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    // console.log(_id);
    const product = await _productModel.productModel.findById(_id);
    if (!product) {
      res.json({
        error: "product not found"
      });
    }
    // console.log(product);
    return res.status(200).json({
      status: "success",
      product
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error
    });
  }
});
var _default = Router;
exports.default = _default;