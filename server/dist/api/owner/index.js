"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _ownerModel = require("../../database/ownerModel");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();
Router.post('/AddOwner', async (req, res) => {
  try {
    const addOwner = await _ownerModel.OwnerModel.create(req.body.data);
    const token = addOwner.genrateJwtToken();
    return res.status(200).json({
      status: "success",
      message: token
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message
    });
  }
});
Router.post('/login', async (req, res) => {
  try {
    const owner = await _ownerModel.OwnerModel.FindByEmailAndPass(req.body.data);
    const token = await owner.genrateJwtToken();
    return res.status(200).json({
      status: "success",
      message: token
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: error.message
    });
  }
});
var _default = Router;
exports.default = _default;