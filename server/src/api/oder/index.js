import mongoose from "mongoose";
import express from "express";
import { orderModel } from "../../database/orderModel";

import sendEmail from "../../config/sendEmail";
import passport from "passport";
import { productModel } from "../../database/productModel";

const Router = express.Router();

Router.post(
    "/orderDetails", async (req, res) => {
        try {
            const { shippingInfo, orderItems, paymentInfo, totalCartPrice, orderStatus, user } = req.body;
            // console.log("data revived",shippingInfo);
            // console.log(shippingInfo.phoneNo);
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

            }

            for (const items of orderItems) {

                order.orderItems.push(items);
            }

            await order.save();

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
        return res.status(500).json({ status: "failed", error: error.message })
    }
})

// get order product --admin\

Router.get("/getOrderdProduct/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const products = await productModel.find({ admin: id });

        const orders = await orderModel
            .find({ 'orderItems.product': { $in: products.map(product => product._id) } })
            .populate({
                path: 'orderItems.product', // Specify the correct path
            });
        // console.log(orders[0].shippingInfo);
        let productFound = [];
        const orderdProductDetails = orders.map(order => ({
            orderItems: order.orderItems,
            shippingInfo: order.shippingInfo,
        }));

        for (const item of orderdProductDetails) {

            if (item?.orderItems[0].product.admin && item?.orderItems[0].product.admin.toString() === id) {

                productFound.push(item)
            }
        }

        return res.json(productFound)

        //   return res.status(201).json({ products })
    } catch (error) {
        return res.status(500).json({ status: "Failed", error: error.message });

    }
})

// get orderDetails based on orderItems
Router.get('/detDetailsByProductId/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await orderModel.findOne({ 'orderItems._id': id });
        const matchItem = product.orderItems.find(item => item._id.toString() === id)
        // console.log(product);
        const responseProduct = {
            ...product.toObject(),
            orderItems: [matchItem]
        }
        // console.log(responseProduct);
        return res.status(200).json({ status: "success", responseProduct })
    } catch (error) {
        return res.status(500).json({ status: "Failed", error: error.message })
    }
})
Router.put('/updateStatus/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const orderStatus = req.body.orderStatus;
        
        const updatedOrder = await orderModel.findOneAndUpdate({ 'orderItems._id': id }, { $set: { 'orderItems.$.orderStatus': orderStatus } }, { new: true })
        // console.log(updatedOrder);
        if(!updatedOrder){
            return res.json(404).json({message:"something went wrong"})
        }
        return res.status(200).json({ message:"updated successfully" })
    } catch (error) {
        return res.status(500).json({ status: "Failed", error: error.message })

    }
})

export default Router;
