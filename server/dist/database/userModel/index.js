"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UserSchema = new _mongoose.default.Schema({
  fullName: {
    type: String,
    requried: true
  },
  email: {
    type: String,
    requried: true
  },
  phoneNumber: {
    type: Number
    // requried:true,
  },

  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
UserSchema.methods.genrateJwtToken = function () {
  return _jsonwebtoken.default.sign({
    user: this._id.toString()
  }, "flipcart", {
    expiresIn: "10d"
  });
};
UserSchema.statics.findByEmail = async ({
  email
}) => {
  const checkByEmail = await UserModel.findOne({
    email
  });
  if (checkByEmail) {
    throw new Error("User already exist...");
  }
  return false;
};
UserSchema.statics.FindByEmailAndPass = async ({
  email,
  password
}) => {
  const user = await UserModel.findOne({
    email
  });
  if (!user) throw new Error("user not exist");
  const checkPassword = await _bcryptjs.default.compare(password, user.password);
  if (!checkPassword) {
    throw new Error("invalid credentials");
  }
  return user;
};
UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  _bcryptjs.default.genSalt(8, (error, salt) => {
    if (error) return next(error);
    _bcryptjs.default.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);
      user.password = hash;
      return next();
    });
  });
});
const UserModel = _mongoose.default.model("users", UserSchema);
exports.UserModel = UserModel;