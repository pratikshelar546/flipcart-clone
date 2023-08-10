import mongoose from "mongoose";
import express from "express";
import { orderModel } from "../../database/orderModel";

import sendEmail from "../../config/sendEmail";
import passport from "passport";

const Router = express.Router();

Router.post(
    "/orderDetails", async (req, res) => {
        try {
            const { shippingInfo, orderItems, paymentInfo, totalCartPrice, orderStatus, user } = req.body;
            // console.log("data revived",shippingInfo);
            console.log(shippingInfo.phoneNo);
            const paidAt = Date.now();
            // console.log(user);
            let order = await orderModel.findOne({ "user._id": user._id });
            // console.log(order);
            if (!order) {
                order = await orderModel.create({
                    shippingInfo,
                    orderItems,
                    paymentInfo,
                    totalCartPrice,
                    orderStatus,
                    user,
                    paidAt,
                });
                // console.log("order cretated");
            }
            // console.log("order Existed");
            for (const items of orderItems) {
                // console.log(items);
                order.orderItems.push(items);
            }
            // console.log({orderItems});

            // console.log(order);
            await order.save();
            // console.log(order);
            // if (check) {
            //     const order = await orderModel.findOneAndUpdate({
            //         shippingInfo,
            //         orderItems,
            //         paymentInfo,
            //         totalCartPrice,
            //         orderStatus,
            //         user,
            //         paidAt,
            //     });
            //     console.log("updated", order);
            //     return order
            // } else {
            //     const order = await orderModel.create({
            //         shippingInfo,
            //         orderItems,
            //         paymentInfo,
            //         totalCartPrice,
            //         orderStatus,
            //         user,
            //         paidAt,
            //     });

            //     console.log("from order added");

            // }
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
// get order details by user id
Router.get('/getOrderDetails/:id', async (req, res) => {
    const userId = req.params.id;
    // console.log(userId);
    try {
        const orderDetails = await orderModel.findOne({ "user._id": userId });
        // console.log(orderDetails);
        if (!orderDetails) {
            return res.status(404).json({ status: "failed", message: "please order product first" })
        }
        return res.status(200).json({ status: "success", orderDetails })
    } catch (error) {
        return res.status(500).json({ status: "failed", error })
    }
})

export default Router;
