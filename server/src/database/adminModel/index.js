import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        fullName:{
            type: String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
     },{
        timestamps:ture
     }
)

export const adminModel = mongoose.model("admins", adminSchema);