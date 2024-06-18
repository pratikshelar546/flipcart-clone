"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OwnerModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ownerSchema = new _mongoose.default.Schema({
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
ownerSchema.methods.genrateJwtToken = function () {
  return _jsonwebtoken.default.sign({
    admin: this._id.toString()
  }, "flipcartOwner", {
    expiresIn: "10d"
  });
};
ownerSchema.statics.findByEmail = async ({
  email
}) => {
  const admin = await OwnerModel.findOne({
    email
  });
  if (admin) {
    throw new Error("Admin already exist please login");
  }
  return false;
};
ownerSchema.statics.FindByEmailAndPass = async ({
  email,
  password
}) => {
  const admin = await OwnerModel.findOne({
    email
  });
  if (!admin) throw new Error("admin not exist");
  const checkPassword = await _bcryptjs.default.compare(password, admin.password);
  if (!checkPassword) {
    throw new Error("invalid credentials");
  }
  return admin;
};
ownerSchema.pre("save", function (next) {
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
const OwnerModel = _mongoose.default.model('Owner', ownerSchema);
exports.OwnerModel = OwnerModel;