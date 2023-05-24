const mongoose = require("mongoose");

const loginSchema = mongoose.Schema(
    {
    user_id: {
        type: String,
        required: true,
        ref: "User",
    },
    username: {
        type: String,
        required: [true, "Please add the username"]
    },
    password: {
        type: String,
        required: [true, "Please add the password"]
    },
    },  
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Login", loginSchema, "sampleDetails");