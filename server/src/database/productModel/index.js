import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        isOffer: {
            type: Boolean
        },
        offerPrice: {
            type: Number
        },
        description: {
            type: String,
            // required: true
        },
        category: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        specification: [
            {
            title: {
                type: String,
                // required: true
            },
            description: {
                type: String,
                // required: true
            }
        }
    ],
        key:{
            type:String,
            required:true
        },
        Highlights:{
                type:Array,
                // required:true
            },
            service:{
                type:Array
            },
        image: {
            type: Array
        },
        brand: {
            Name: {
                type: String,
                required: true
            },
            logo: {
                type: String
            }
        },
        reviews: [
            {
                user: {
                    type: mongoose.Schema.ObjectId,
                    ref: "User",
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                rating: {
                    type: Number,
                    required: true
                },
                comment: {
                    type: String,
                    required: true
                }
            }
        ],
    }
)
export const productModel = mongoose.model("Product", productSchema);