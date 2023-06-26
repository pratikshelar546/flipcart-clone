import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            requried: true
        },
        email: {
            type: String, requried: true
        },
        phoneNumber: {
            type: Number,
            // requried:true,

        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

UserSchema.methods.genrateJwtToken = function () {
    return jwt.sign({ user: this._id.toString() }, "flipcart",{expiresIn:"10d"});
}

UserSchema.statics.findByEmail = async ({ email }) => {
    const checkByEmail = await UserModel.findOne({ email });
    if (checkByEmail) {
        throw new Error("User already exist...")
    }
    return false;
};

UserSchema.statics.FindByEmailAndPass = async ({ email, password }) => {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("user not exist");

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        throw new Error("invalid credentials");
    }
    return user;
};

UserSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return next();


    bcrypt.genSalt(8, (error, salt) => {
        if (error) return next(error);

        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error);

            user.password = hash;
            return next();
        })
    })
})
export const UserModel = mongoose.model("users", UserSchema);
