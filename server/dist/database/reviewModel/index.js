"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reviewModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const reviewSchema = new _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Users"
  },
  product: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Products"
  },
  review: {
    reviews: {
      type: String
    },
    rating: {
      type: Number,
      default: 1
    }
  }
}, {
  timestamps: true
});
const reviewModel = _mongoose.default.model("Review", reviewSchema);
exports.reviewModel = reviewModel;