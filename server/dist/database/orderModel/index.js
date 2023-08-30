"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const orderSchema = new _mongoose.default.Schema({
  shippingInfo: {
    name: {
      type: String,
      required: true
    },
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
    phoneNo: {
      type: Number,
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
    offerPrice: {
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
      type: _mongoose.default.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    orderdAt: {
      type: Date,
      default: Date.now
    },
    orderStatus: {
      type: String,
      default: "Processing"
    }
  }],
  user: {
    _id: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  paymentInfo: {
    id: {
      type: String
      // required: true
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
  totalCartPrice: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const orderModel = _mongoose.default.model("orderDetails", orderSchema);
exports.orderModel = orderModel;