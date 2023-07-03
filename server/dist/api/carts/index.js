"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _cartModel = require("../../database/cartModel");
var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _passport = _interopRequireDefault(require("passport"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import jwt from "jwttoekn"

const Router = _express.default.Router();

//add to cart

Router.put("/Add", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      user
    } = req;
    const Details = req.body.productDetails;
    console.log(Details);
    let cart = await _cartModel.CartModel.findOne({
      user: user._id
    });
    if (!cart) {
      cart = new _cartModel.CartModel({
        user: user._id
      });
    }
    for (const item of Details) {
      const {
        details,
        quantity
      } = item;
      // check the product is exist or not
      const existingProduct = cart.productDetails.find(product => product.details.equals(details));
      console.log(existingProduct);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.productDetails.push({
          details: new _mongoose.default.Types.ObjectId(details),
          quantity
        });
      }
    }
    await cart.save();
    // const updatedProductDetails = Details.map((item) => ({
    //   details:new mongoose.Types.ObjectId(item.details),
    //   quantity: item.quantity
    // }));

    // await cart.updateOne();
    return res.status(200).json({
      status: "success",
      cart: cart
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: error.message
    });
  }
});
Router.get("/getCart", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      user
    } = req;
    console.log(user._id);
    const getCart = await _cartModel.CartModel.findOne({
      user: user._id
    });
    res.status(200).json({
      status: "success",
      getCart
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message
    });
  }
});
var _default = Router;
exports.default = _default;