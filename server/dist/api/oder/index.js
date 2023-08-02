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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();
Router.post("/orderDetails", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      totalPrice,
      orderStatus
    } = req.body;
    const {
      user
    } = req;
    const paidAt = Date.now();
    // console.log(user);
    const order = await _orderModel.orderModel.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      totalPrice,
      orderStatus,
      user,
      paidAt
    });
    await (0, _sendEmail.default)({
      email: user.email,
      templateId: 'd-935fb403c94b4457bc97e360e598b769',
      data: {
        name: user.fullName,
        shippingInfo,
        orderItems,
        paymentInfo,
        totalPrice,
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
var _default = Router;
exports.default = _default;