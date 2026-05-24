const bcrypt = require("bcryptjs");
const User = require("../models/user.models");
const jwt = require("jsonwebtoken");

const generate_Token = (userid) => {
    return jwt.sign({userid}, process.env.JWT_SECRET, 
        { 
            expiresIn: process.env.JWT_EXPIRES_IN
        } );
};

const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "You have to provide all required fields" });
        }
        const existing_User = await User.findOne({email});
        if (existing_User) {
            return res.status(400).json({message: "User with this entered email already exists..."});
        }

        const salt = await bcrypt.genSalt(10);
        const hashed_Password = await bcrypt.hash(password, salt);
        const new_User = await User.create({
            name,
            email,
            password: hashed_Password
        });
        const token = generate_Token(new_User._id);
        return res.status(201).json({ 
            message: "User is registered successfully",
            token
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error occurred!" });
    }
};

const Login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "You have to provide email & password fields" });
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: "Invalid user's credentials..."});
        }
       
        const is_Match = await bcrypt.compare(password, user.password);
        if (!is_Match) {
            return res.status(400).json({message: "Invalid user's credentials..."});
        }

        const token = generate_Token(user._id);
        return res.status(200).json({
            message: "User is logged in successfully",
            token, 
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error occurred!" });
    }
};

const get_Profile = async(req, res) => {
    try {
        return res.status(200).json({
            message: "User's profile is fetched successfully....",
            user: req.user
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error is occurred!"
        });
    }
};

module.exports = { Register, Login, get_Profile };