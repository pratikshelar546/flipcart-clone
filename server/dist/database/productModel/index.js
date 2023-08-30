"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const productSchema = new _mongoose.default.Schema({
  admin: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "admins",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  isOffer: {
    type: Boolean
  },
  offerPrice: {
    type: Number
  },
  description: {
    type: String
    // required: true
  },

  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  specification: [{
    title: {
      type: String
      // required: true
    },

    description: {
      type: String
      // required: true
    }
  }],

  key: {
    type: String,
    required: true
  },
  Highlights: {
    type: Array
    // required:true
  },

  service: {
    type: Array
  },
  image: {
    type: Array
  },
  brand: {
    Name: {
      type: String,
      required: true
    },
    logo: {
      type: String
    }
  },
  reviews: [{
    user: {
      type: _mongoose.default.Schema.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  }]
});
const productModel = _mongoose.default.model("Product", productSchema);
exports.productModel = productModel;