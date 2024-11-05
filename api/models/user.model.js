import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        default: "https://www.google.com/imgres?q=user%20image&imgurl=https%3A%2F%2Fwww.transparentpng.com%2Fthumb%2Fuser%2Fgray-user-profile-icon-png-fP8Q1P.png&imgrefurl=https%3A%2F%2Fwww.transparentpng.com%2Fcats%2Fuser-2132.html&docid=T0lbmAoJzc3SFM&tbnid=FvmzF27mGmzQZM&vet=12ahUKEwjSieX4xsSJAxXARmwGHaKbPBwQM3oECHkQAA..i&w=400&h=400&hcb=2&ved=2ahUKEwjSieX4xsSJAxXARmwGHaKbPBwQM3oECHkQAA"
    }
}, {timestamps:true});

const User = mongoose.model('User', userSchema);

export default User;