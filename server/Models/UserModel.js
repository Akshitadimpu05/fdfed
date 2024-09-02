
const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({

    username: String,
    email: String,
    password_hash: String,
    isGoogleId: { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.model("User", usersSchema);

module.exports = User;