"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const adminSchema = new _mongoose.default.Schema({
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
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
  timestamps: true
});
adminSchema.methods.genrateJwtToken = function () {
  return _jsonwebtoken.default.sign({
    admin: this._id.toString()
  }, "flipcart", {
    expiresIn: "10d"
  });
};
adminSchema.statics.findByEmail = async ({
  email
}) => {
  const admin = await AdminModel.findOne({
    email
  });
  if (admin) {
    throw new Error("Admin already exist please login");
  }
  return false;
};
adminSchema.statics.FindByEmailAndPass = async ({
  email,
  password
}) => {
  const admin = await AdminModel.findOne({
    email
  });
  if (!admin) throw new Error("admin not exist");
  const checkPassword = await _bcryptjs.default.compare(password, admin.password);
  if (!checkPassword) {
    throw new Error("invalid credentials");
  }
  return admin;
};
adminSchema.pre("save", function (next) {
  const admin = this;
  if (!admin.isModified("password")) return next();
  _bcryptjs.default.genSalt(8, (error, salt) => {
    if (error) return next(error);
    _bcryptjs.default.hash(admin.password, salt, (error, hash) => {
      if (error) return next(error);
      admin.password = hash;
      return next();
    });
  });
});
const AdminModel = _mongoose.default.model("admins", adminSchema);
exports.AdminModel = AdminModel;