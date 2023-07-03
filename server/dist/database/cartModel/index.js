"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CartModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const cartSchema = new _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Types.ObjectId,
    ref: "users"
  },
  productDetails: [{
    details: {
      type: _mongoose.default.Types.ObjectId,
      ref: "products",
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    }
  }]
}, {
  timeStamps: true
});
const CartModel = _mongoose.default.model("Carts", cartSchema);
exports.CartModel = CartModel;