const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');
const Admin = require('../models/admin');
const Company = require('../models/company');

async function adminRegister(req, res) {
    try {
        const { name, phoneNumber, mpin, email } = req.body;

        // Check if user already exists
        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email already in use');
        }

        // Hash the mpin before saving
        const hashedMpin = await bcrypt.hash(mpin, 10);
        const adminId = uuid();

        const newUser = new Admin({ adminId, name, phoneNumber, mpin: hashedMpin, email });
        await newUser.save();

        res.status(201).send('Admin registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering admin');
    }
}

async function adminLogin(req, res) {
    try {
        const { email, mpin } = req.body;

        console.log(req.body);
        const user = await Admin.findOne({ email });

        if (!user) {
            return res.status(404).send({ status: 2, message: "Email not found" });
        }

        const validMpin = await bcrypt.compare(mpin, user.mpin);
        if (!validMpin) {
            return res.status(401).send({ status: 2, message: "Incorrect mpin" });
        }

        const token = jwt.sign({
            email: user.email,
            adminId: user.adminId,
            name: user.name,
            type: "admin",
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            status: 1,
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 2, message: "Server error", error });
    }
}

module.exports = { adminRegister, adminLogin };
