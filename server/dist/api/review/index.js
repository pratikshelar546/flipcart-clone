"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _reviewModel = require("../../database/reviewModel");
var _passport = _interopRequireDefault(require("passport"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();
Router.post("/Add", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const user = req;
    const productId = req.body.productId;
    const review = req.body.review;
    const newReview = await _reviewModel.reviewModel.create({
      user: user._id,
      product: productId,
      review: review
    });
    return res.status(201).json({
      status: "success",
      newReview
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message
    });
  }
});
Router.delete("/remove", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const user = req;
    await _reviewModel.reviewModel.findOneAndDelete({
      user: user._id
    });
    return res.status(201).json({
      status: "success",
      message: "Reivew is deleted"
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message
    });
  }
});
var _default = Router;
exports.default = _default;