"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _userModel = require("../../database/userModel");
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _sendEmail = _interopRequireDefault(require("../../config/sendEmail"));
var _crypto = _interopRequireDefault(require("crypto"));
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
Router.post("/forgetPassword", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await _userModel.UserModel.findOne({
      email
    });
    // console.log(user);
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "user not found"
      });
    }
    const resetToken = await user.getResetToken();
    await user.save();
    const url = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;
    const message = `Click on the link to reset your password ${url}. If you have not requent the please igonre`;
    await (0, _sendEmail.default)({
      email: user.email,
      data: {
        message
      }
    });
    return res.status(200).json({
      status: "success",
      message: `Reset password link is share to email ${user.email}`
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message
    });
  }
});
Router.put("/resetPassword/:token", async (req, res) => {
  try {
    const {
      token
    } = req.params;
    const resetPasswordToken = _crypto.default.createHash("sha256").update(token).digest("hex");
    const user = await _userModel.UserModel.findOne({
      resetPasswordToken,
      resetPasswordExipre: {
        $gt: Date.now()
      }
    });
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "user not found"
      });
    }
    user.password = req.body.password;
    user.resetPasswordExipre = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    return res.status(200).json({
      status: "success",
      message: "Password updated successfully"
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message
    });
  }
});
Router.put('/chnagePassword', async (req, res) => {
  try {
    const {
      oldPassword,
      newPassowrd,
      confirmPassword,
      email
    } = req.body;
    const user = await _userModel.UserModel.findOne({
      email
    });
    if (!user) res.status(400).json({
      status: "failed",
      message: "user not found"
    });
    await user.matchPassword(oldPassword, (error, isMatch) => {
      if (error) {
        return res.status(400).json({
          status: "failed",
          message: "Something went wrong please refresh the page or try later"
        });
      }
      if (isMatch) {
        if (newPassowrd === confirmPassword) {
          user.password = confirmPassword;
          user.save();
          return res.status(200).json({
            status: "success",
            message: "Password changed successfully"
          });
        } else {
          return res.status(404).json({
            status: "not matched",
            message: "Pelase enter the same password that  can matched"
          });
        }
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