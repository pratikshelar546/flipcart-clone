"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _userModel = require("../../database/userModel");
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();
Router.post("/signup", async (req, res) => {
  try {
    await _userModel.UserModel.findByEmail(req.body.credentials);
    const newUser = await _userModel.UserModel.create(req.body.credentials);
    const token = newUser.genrateJwtToken();
    return res.status(200).json({
      status: "success",
      token
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      error: error.message
    });
  }
});
Router.post("/signin", async (req, res) => {
  try {
    const user = await _userModel.UserModel.FindByEmailAndPass(req.body.credentials);
    //  console.log(user);
    const token = await user.genrateJwtToken();
    return res.status(200).json({
      status: "success",
      token
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message
    });
  }
});
Router.get("/getUser", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      fullName,
      email,
      _id
    } = req.user;
    // console.log(req.user._id);
    return res.status(201).json({
      user: {
        fullName,
        email,
        _id
      }
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