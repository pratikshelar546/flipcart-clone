"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
var _connection = _interopRequireDefault(require("./database/connection.js"));
var _cloudinary = require("cloudinary");
var _express = _interopRequireDefault(require("express"));
var _routeConfig = _interopRequireDefault(require("./config/routeConfig.js"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _cors = _interopRequireDefault(require("cors"));
var _passport = _interopRequireDefault(require("passport"));
var _users = _interopRequireDefault(require("./api/users"));
var _products = _interopRequireDefault(require("./api/products"));
var _oder = _interopRequireDefault(require("./api/oder"));
var _carts = _interopRequireDefault(require("./api/carts"));
var _admin = _interopRequireDefault(require("./api/admin"));
var _review = _interopRequireDefault(require("./api/review"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import react from "react";

// import fileUpload from "express-fileupload";
_dotenv.default.config();
const flipcart = (0, _express.default)();
(0, _routeConfig.default)(_passport.default);
// googleConfig(passport);
flipcart.use(_express.default.json());
flipcart.use((0, _expressSession.default)({
  secret: "flipcart"
}));
flipcart.use(_passport.default.initialize());
flipcart.use(_passport.default.session());
flipcart.get("/", (req, res) => res.send("Namaste"));
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200
};
// flipcart.use(fileUpload({
//   useTempFiles:true 
// }))
flipcart.use((0, _cors.default)(corsOptions));
flipcart.use(_bodyParser.default.json());
flipcart.use("/upload", _express.default.static("upload"));
flipcart.use("/user", _users.default);
flipcart.use("/product", _products.default);
flipcart.use("/cart", _carts.default);
flipcart.use("/review", _review.default);
flipcart.use("/order", _oder.default);
flipcart.use("/admin", _admin.default);
// cloudinary
flipcart.use(_bodyParser.default.json({
  limit: '10mb'
}));
flipcart.use(_bodyParser.default.urlencoded({
  extended: true,
  limit: '10mb'
}));
_cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
const port = 8080;
flipcart.listen(port, () => {
  (0, _connection.default)().then(() => {
    console.log("server is running");
  }).catch(error => {
    console.log("server is running but database connection failed");
    console.log(error);
  });
});
// console.log(`server is running is on port ${port}`));