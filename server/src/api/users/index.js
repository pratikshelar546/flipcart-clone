import { UserModel } from "../../database/userModel";
import express from "express";

const Router = express.Router();

Router.post("/signup", async (req, res) => {
  try {
    await UserModel.findByEmail(req.body);
    const newUser = await UserModel.create(req.body);
    const token = newUser.genrateJwtToken();
    return res.status(200).json({ status: "success", token })

  } catch (error) {
    return res.status(500).json({ status: "failed", error: error.message });
  }
})

Router.post("/signin" , async (req,res)=>{
  try {
   const user = await UserModel.FindByEmailAndPass(req.body);
  //  console.log(user);
   const token = await user.genrateJwtToken();
   return res.status(200).json({status:"success" ,token})
  } catch (error) {
    return res.status(500).json({status:"failed" , message:error })
  }
})
export default Router;