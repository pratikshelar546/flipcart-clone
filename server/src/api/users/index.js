import { UserModel } from "../../database/userModel";
import express from "express";
import passport from "passport";
const Router = express.Router();

Router.post("/signup", async (req, res) => {
  try {
    await UserModel.findByEmail(req.body.credentials);
    const newUser = await UserModel.create(req.body.credentials);
    const token = newUser.genrateJwtToken();
    return res.status(200).json({ status: "success", token })

  } catch (error) {
    return res.status(500).json({ status: "failed", error: error.message });
  }
})

Router.post("/signin" , async (req,res)=>{
  try {
   const user = await UserModel.FindByEmailAndPass(req.body.credentials);
  //  console.log(user);
   const token = await user.genrateJwtToken();
   return res.status(200).json({status:"success" ,token})
  } catch (error) {
    return res.status(500).json({status:"failed" , message:error.message })
  }
});

Router.get("/getUser", passport.authenticate("jwt", { session: false }), async(req,res)=>{
try {
  const {fullName , email} = req.user;
// console.log(user);
return res.status(201).json({user:{ fullName,email}})
} catch (error) {
  return res.status(500).json({status:"failed",message:error.message})
}
})
export default Router;