"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _adminModel = require("../../database/adminModel");
var _passport = _interopRequireDefault(require("passport"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();
Router.post("/Signup", async (req, res) => {
  try {
    await _adminModel.AdminModel.findByEmail(req.body.data);
    const newUser = await _adminModel.AdminModel.create(req.body.data);
    const token = newUser.genrateJwtToken();
    return res.status(200).json({
      status: "success",
      token
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      error: error.message
    });
  }
});
Router.post("/Login", async (req, res) => {
  try {
    const admin = await _adminModel.AdminModel.FindByEmailAndPass(req.body.data);
    const token = await admin.genrateJwtToken();
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
Router.get("/getAdmin", _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    //   console.log(req.adminProduct);
    const {
      fullName,
      email,
      _id,
      phoneNumber
    } = req.user;
    return res.status(200).json({
      admin: {
        fullName,
        email,
        _id,
        phoneNumber
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
var _default = Router;
exports.default = _default;