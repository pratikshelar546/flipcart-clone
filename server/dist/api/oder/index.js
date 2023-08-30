"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _express = _interopRequireDefault(require("express"));
var _orderModel = require("../../database/orderModel");
var _sendEmail = _interopRequireDefault(require("../../config/sendEmail"));
var _passport = _interopRequireDefault(require("passport"));
var _productModel = require("../../database/productModel");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const Router = _express.default.Router();
Router.post("/orderDetails", async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      totalCartPrice,
      orderStatus,
      user
    } = req.body;
    // console.log("data revived",shippingInfo);
    // console.log(shippingInfo.phoneNo);
    const paidAt = Date.now();
    // console.log(user);
    let order = await _orderModel.orderModel.findOne({
      "user._id": user._id
    });
    // console.log(order);
    if (!order) {
      order = await _orderModel.orderModel.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        totalCartPrice,
        orderStatus,
        user,
        paidAt
      });
    }
    for (const items of orderItems) {
      order.orderItems.push(items);
    }
    await order.save();
    await (0, _sendEmail.default)({
      email: user.email,
      templateId: 'd-935fb403c94b4457bc97e360e598b769',
      data: {
        name: user.fullName,
        shippingInfo,
        orderItems,
        paymentInfo,
        totalCartPrice,
        oId: order._id
      }
    });
    res.status(200).json({
      status: "Success",
      details: order
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message
    });
  }
  // console.log(shippingInfo,orderItems,paymentInfo,totalPrice,orderStatus);
});
// get order details by user id
Router.get('/getOrderDetails/:id', async (req, res) => {
  const userId = req.params.id;
  // console.log(userId);
  try {
    const orderDetails = await _orderModel.orderModel.findOne({
      "user._id": userId
    });
    // console.log(orderDetails);
    if (!orderDetails) {
      return res.status(404).json({
        status: "failed",
        message: "please order product first"
      });
    }
    return res.status(200).json({
      status: "success",
      orderDetails
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      error: error.message
    });
  }
});

// get order product --admin\

Router.get("/getOrderdProduct/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const products = await _productModel.productModel.find({
      admin: id
    });
    const orders = await _orderModel.orderModel.find({
      'orderItems.product': {
        $in: products.map(product => product._id)
      }
    }).populate({
      path: 'orderItems.product' // Specify the correct path
    });
    // console.log(orders[0].shippingInfo);
    let productFound = [];
    const orderdProductDetails = orders.map(order => ({
      orderItems: order.orderItems,
      shippingInfo: order.shippingInfo
    }));
    for (const item of orderdProductDetails) {
      if (item?.orderItems[0].product.admin && item?.orderItems[0].product.admin.toString() === id) {
        productFound.push(item);
      }
    }
    return res.json(productFound);

    //   return res.status(201).json({ products })
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      error: error.message
    });
  }
});

// get orderDetails based on orderItems
Router.get('/detDetailsByProductId/:id', async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const product = await _orderModel.orderModel.findOne({
      'orderItems._id': id
    });
    const matchItem = product.orderItems.find(item => item._id.toString() === id);
    // console.log(product);
    const responseProduct = _objectSpread(_objectSpread({}, product.toObject()), {}, {
      orderItems: [matchItem]
    });
    // console.log(responseProduct);
    return res.status(200).json({
      status: "success",
      responseProduct
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      error: error.message
    });
  }
});
Router.put('/updateStatus/:id', async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const orderStatus = req.body.orderStatus;
    const updatedOrder = await _orderModel.orderModel.findOneAndUpdate({
      'orderItems._id': id
    }, {
      $set: {
        'orderItems.$.orderStatus': orderStatus
      }
    }, {
      new: true
    });
    // console.log(updatedOrder);
    if (!updatedOrder) {
      return res.json(404).json({
        message: "something went wrong"
      });
    }
    return res.status(200).json({
      message: "updated successfully"
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      error: error.message
    });
  }
});
var _default = Router;
exports.default = _default;