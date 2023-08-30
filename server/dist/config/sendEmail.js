"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const sgMail = require("@sendgrid/mail");
_dotenv.default.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// console.log(process.env.SENDGRID_MAILID);
const sendEmail = async optioans => {
  // console.log(optioans.data);
  const message = {
    to: optioans.email,
    from: process.env.SENDGRID_MAILID,
    subject: "Your order details",
    templateId: optioans.templateId,
    dynamic_template_data: optioans.data
  };
  // console.log(message);
  sgMail.send(message).then(() => {
    console.log("Email Sent");
  }).catch(error => {
    console.error(error);
  });
};
module.exports = sendEmail;

// const sendEmailForResetPassword = async(options)=>{
// const message = {
//   to:options.email,
//   from: process.env.SENDGRID_MAILID,
//   subject:"Reset password Link",
//   text:options.data.message
// }
// sgMail
//     .send(message)
//     .then(() => {
//       // console.log("Email Sent");
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }
// module.exports= sendEmailForResetPassword;