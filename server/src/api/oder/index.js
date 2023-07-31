import mongoose from "mongoose";
import express from "express";
import { orderModel } from "../../database/orderModel";

const Router = express.Router();

Router.post("/orderDetails" , async (req,res)=>{
    try {
    const {shippingInfo,orderItems,paymentInfo,totalPrice,orderStatus} = req.body;
    const{user} = req.body;
    const paidAt= Date.now();
    // console.log(user);
        const order = await orderModel.create({shippingInfo,orderItems,paymentInfo,totalPrice,orderStatus,user,paidAt});
        res.status(200).json({status:"Success",details:order})
    } catch (error) {
        res.status(500).json({status:"failed",message:error.message})
    }
    // console.log(shippingInfo,orderItems,paymentInfo,totalPrice,orderStatus);
})

export default Router