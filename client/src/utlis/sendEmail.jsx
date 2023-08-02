const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.REACT_APP_API_KEY);
const message = {
  to: "pratikshelar987@gmail.com",
  from: "pratikshelar2503@gmail.com",
  text: "hello from shopKart",
  html: "<h1>hello from shopKart</h1>",
};

sgMail
  .send(message)
  .then((response) => console.log("mail is sent"))
  .catch((error) => console.log(error.message));
