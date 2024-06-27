const userModel = require("../models/userModel.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');

// Login user
const loginUser = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User Doesn't exists" });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.json({ success: false, message: 'Invalid password' });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });

    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register user
const registerUser = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: 'User Already exists' });
        }

        // Validate email format and password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Enter a valid Email' });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: 'Password should be at least 8 characters' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

module.exports = { loginUser, registerUser };
