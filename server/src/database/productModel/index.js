import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        image:{
            type:Array
        },
        
        rating:[
            {
            rate:{
                type:Number
            },
            count:{
                type:Number
            }
        }
        ]
    }
)
export const productModel =  mongoose.model("Product" , productSchema);