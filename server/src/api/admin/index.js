import express from "express"
import { AdminModel } from "../../database/adminModel"
import passport from "passport";
const Router = express.Router();
Router.post("/Signup", async (req, res) => {
    try {

        await AdminModel.findByEmail(req.body.data);
        const newUser = await AdminModel.create(req.body.data);
        const token = newUser.genrateJwtToken();
        return res.status(200).json({ status: "success", token })
    } catch (error) {
        return res.status(500).json({ status: "Failed", error: error.message })
    }
})
Router.post("/Login", async (req, res) => {
    try {
        const admin = await AdminModel.FindByEmailAndPass(req.body.data);
        const token = await admin.genrateJwtToken();
        return res.status(200).json({ status: "success", token })
    } catch (error) {
        return res.status(500).json({ status: "failed", error: error.message })
    }
});
Router.get("/getAdmin", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
    //   console.log(req.adminProduct);
        const { fullName, email, _id, phoneNumber } = req.user;
      
        return res.status(200).json({ admin: { fullName, email, _id, phoneNumber } })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
});

export default Router