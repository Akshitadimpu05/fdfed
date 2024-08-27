const express = require('express');
const route = express.Router();
const User = require("../Models/UserModel");
const { generateHash } = require("../utils/passwordUtils");
const issueJWT = require("../utils/jwtUtils");

const { login } = require("../middlewares/PassportLogin");
require("../config/passport_config");

route.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ username: username }, { email: email }]
        });

        if (user) {
            return res.status(400).send({ message: "Username or email already in use" });
        }

        const { hash } = generateHash(password);

        const newUser = new User({
            username,
            email,
            password_hash: hash
        });

        await newUser.save();

        const { token } = issueJWT(newUser);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24
        });

        res.status(201).redirect('/');
    } catch (error) {
        res.status(500).send({ message: "Server error. Please try again later." });
    }
});

route.post('/login', login, (req, res) => {
    res.status(200).send({ message: "sucessful login" });
})

module.exports = route;