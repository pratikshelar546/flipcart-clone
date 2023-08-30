"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _passportJwt = _interopRequireDefault(require("passport-jwt"));
var _userModel = require("../database/userModel");
var _adminModel = require("../database/adminModel");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const JWTStrategy = _passportJwt.default.Strategy;
const ExtractJwt = _passportJwt.default.ExtractJwt;
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "flipcart"
};
var _default = passport => {
  passport.use(new JWTStrategy(options, async (jwt__payload, done) => {
    try {
      const doesUserExist = (await _userModel.UserModel.findById(jwt__payload.user)) || (await _adminModel.AdminModel.findById(jwt__payload.admin));
      // const doesUserExist =  await AdminModel.findById(jwt__payload.admin);

      if (!doesUserExist) return done(null, false);
      return done(null, doesUserExist);
    } catch (error) {
      throw new Error(error);
    }
  }));
}; // export default (passport) => {
//   passport.use(
//     new JWTStrategy(options, async (jwt__payload, done) => {
//       try {
//         const doesUserExist = await UserModel.findById(jwt__payload.user);
//         if (!doesUserExist) return done(null, false);
//         return done(null, doesUserExist);
//       } catch (error) {
//         throw new Error(error);
//       }
//     })
//   );
// };
exports.default = _default;