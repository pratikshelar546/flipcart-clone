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
    const {
      user
    } = req;
    // console.log(user._id);
    const productId = req.body.id;
    const {
      review,
      rating
    } = req.body;
    // console.log(review, rating);
    const newReview = await _reviewModel.reviewModel.create({
      user: user._id,
      product: productId,
      review: review,
      rating: rating
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
Router.get("/getReviewByProduct/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const reviews = await _reviewModel.reviewModel.find({
      product: id
    }).populate({
      path: 'user',
      select: 'fullName email'
    });
    // console.log(reviews);
    return res.status(200).json({
      status: "sucess",
      reviews: reviews
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
Router.delete("/deleteReview/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    await _reviewModel.reviewModel.findByIdAndDelete(id);
    return res.status(201).json({
      message: "Review deleted"
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