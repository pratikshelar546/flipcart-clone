import express from "express";
import{reviewModel} from "../../database/reviewModel";
import passport from "passport";

const Router = express.Router();

Router.post("/Add", passport.authenticate("jwt", { session: false }), async(req,res)=>{
        try {
            const user= req;
            const productId= req.body.productId
            const review = req.body.review;

      const newReview= await reviewModel.create({
        user:user._id,
        product:productId,
        review:review
      });
     return res.status(201).json({status:"success", newReview})
        } catch (error) {
           return res.status(500).json({status:"failed",message:error.message});
        }
});

Router.delete("/remove", passport.authenticate("jwt", {session:false}),async(req,res)=>{
    try {
        const user = req;
        await reviewModel.findOneAndDelete({user:user._id});
        return res.status(201).json({status:"success" , message:"Reivew is deleted"})
    } catch (error) {
      return  res.status(500).json({status:"failed", message:error.message})
    }
})

export default Router;