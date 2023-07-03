"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const adminSchema = new _mongoose.default.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: ture
});
const adminModel = _mongoose.default.model("admins", adminSchema);
exports.adminModel = adminModel;