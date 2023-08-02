import mongoose from "mongoose";
import express from "express";
import { orderModel } from "../../database/orderModel";

import sendEmail from "../../config/sendEmail";
import passport from "passport";

const Router = express.Router();

Router.post(
    "/orderDetails", async (req, res) => {
        try {
            const { shippingInfo, orderItems, paymentInfo, totalCartPrice, orderStatus, user } =
                req.body;

// console.log(shippingInfo, orderItems, paymentInfo, totalCartPrice, orderStatus, user);
            const paidAt = Date.now();
            // console.log(user);
            const order = await orderModel.create({
                shippingInfo,
                orderItems,
                paymentInfo,
                totalCartPrice,
                orderStatus,
                user,
                paidAt,
            });
            // console.log("from order" , order);
            await sendEmail({
                email: user.email,
                templateId: 'd-935fb403c94b4457bc97e360e598b769',
                data: {
                    name: user.fullName,
                    shippingInfo,
                    orderItems,
                    paymentInfo,
                    totalCartPrice,
                    oId: order._id
                },
            });
            res.status(200).json({ status: "Success", details: order });
        } catch (error) {
            res.status(500).json({ status: "failed", message: error.message });
        }
        // console.log(shippingInfo,orderItems,paymentInfo,totalPrice,orderStatus);
    }
);

export default Router;
