"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const orderSchema = new _mongoose.default.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    phoneNo: {
      type: String,
      required: true
    }
  },
  orderItems: [{
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    image: {
      type: String
      // required: true
    },

    product: {
      type: _mongoose.default.Schema.ObjectId,
      ref: "Product",
      required: true
    }
  }],
  user: {
    type: _mongoose.default.Schema.ObjectId,
    ref: "User",
    required: true
  },
  paymentInfo: {
    id: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  paidAt: {
    type: Date,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  },
  orderStatus: {
    type: String,
    default: "Processing"
  },
  deliveredAt: Date,
  shippedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const orderModel = _mongoose.default.model("orderDetails", orderSchema);
exports.orderModel = orderModel;