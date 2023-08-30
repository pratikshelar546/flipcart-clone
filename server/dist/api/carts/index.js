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

Router.put("/Add/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const Details = req.body.productDetails;
    let cart = await _cartModel.CartModel.findOne({
      user: id
    });
    if (!cart) {
      cart = new _cartModel.CartModel({
        user: id
      });
    }
    // console.log("am cart " + cart);
    for (const item of Details) {
      const {
        details,
        quantity
      } = item;

      // check the product is exist or not
      const existingProduct = cart.productDetails.find(product => product.details.equals(details));
      if (existingProduct) {
        existingProduct.quantity = quantity;
      } else {
        cart.productDetails.push({
          details: new _mongoose.default.Types.ObjectId(details),
          quantity
        });
      }
    }
    await cart.save();
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
// getCart by auth
Router.get("/getCart", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      user
    } = req;
    // console.log(user._id);
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

// getCart by id
Router.get("/getCart/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    // console.log(user._id);
    const getCart = await _cartModel.CartModel.findOne({
      user: id
    });
    return res.status(200).json({
      status: "success",
      getCart
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      error: error.message
    });
  }
});

// delete product from cart
Router.delete("/delete/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      productId
    } = req.body;
    // console.log( "product "+productId);
    const cart = await _cartModel.CartModel.findOneAndUpdate({
      user: id
    }, {
      $pull: {
        productDetails: {
          details: productId
        }
      }
    }, {
      returnOriginal: false
    });
    // console.log(cart);
    if (!cart) {
      return res.status(404).json({
        status: "Not found",
        error: error.message
      });
    }
    res.status(200).json({
      status: "success",
      cart
    });
    // await cart.findOne()
    // await CartModel.findOneAndDelete({})
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      error: error.message
    });
  }
});
Router.delete("/deleteCart/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;

    // console.log( "product "+productId);
    const cart = await _cartModel.CartModel.findByIdAndDelete(id);
    // console.log(cart);
    if (!cart) {
      return res.status(404).json({
        status: "Not found",
        error: error.message
      });
    }
    res.status(200).json({
      status: "success",
      cart
    });
    // await cart.findOne()
    // await CartModel.findOneAndDelete({})
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      error: error.message
    });
  }
});
var _default = Router;
exports.default = _default;