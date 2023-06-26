// import react from "react";
import dotenv from "dotenv";
import ConnectDB from "./database/connection.js"

import express from "express";
import privateRouteConfig from "./config/routeConfig.js"
import session from "express-session";
import cors from "cors";
import passport from "passport";
import User from "./api/users";
import Product from "./api/products"
import Cart from "./api/carts"
import bodyParser from "body-parser";
dotenv.config();
const flipcart = express();

privateRouteConfig(passport);
// googleConfig(passport);
flipcart.use(express.json());
flipcart.use(session({ secret: "flipcart" }));
flipcart.use(passport.initialize());
flipcart.use(passport.session());
flipcart.get("/", (req, res) => res.send("Namaste"));
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

flipcart.use(cors(corsOptions));

flipcart.use(bodyParser.json());
flipcart.use("/upload", express.static("upload"));
flipcart.use("/user",User);
flipcart.use("/product" , Product);
flipcart.use("/cart", Cart);
const port = 8080;
flipcart.listen(port, () => {
  ConnectDB()
    .then(() => {
      console.log("server is running");
    })
    .catch((error) => {
      console.log("server is running but database connection failed");
      console.log(error);
    });
});
// console.log(`server is running is on port ${port}`));
