// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function register(req, res) {
    try {
        console.log(req.body);
        const { name, phoneNumber,mpin } = req.body;
        const newUser = new User({ name, phoneNumber ,mpin});
        await newUser.save();
        res.status(201).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
}

async function login(req, res) {
    try {
        const { phoneNumber, mpin } = req.body;
        const user = await User.findOne({ phoneNumber });
        if (!user) return res.status(400).send('User not found');
        // const validmpin = await bcrypt.compare(mpin, user.mpin);
        // console.log(validmpin);
        if(mpin != user.mpin) return res.status(401).send('Incorrect mpin');
            
        // if (!validmpin) return res.status(401).send('Incorrect mpin');
        const token = jwt.sign({ phoneNumber: user.phoneNumber }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
}

module.exports = { register, login };
