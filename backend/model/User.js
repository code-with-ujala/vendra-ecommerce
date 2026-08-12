
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user' ,'admin'],
        default: 'user'
    },
    verified: {
        type: Boolean,
        default: false
    },

    //otp → User ka 6-digit OTP store karega.
    otp: {
    type: String,
    },


    //otpExpire → OTP kab expire hoga (jaise 10 minutes baad).
    otpExpire: {
        type: Date,
    },
});


module.exports = mongoose.model("User", userSchema);