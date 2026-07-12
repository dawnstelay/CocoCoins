import mongoose from "mongoose";

const userDetailsSchema = new mongoose.Schema( {
    name: {
        type:String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type:String,
        required: true,
        minLength: 6
    }
}, {timestamps:true});

const User = mongoose.model("UserModel", userDetailsSchema);
export default User;