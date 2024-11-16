// models/User.js
const mongoose = require( 'mongoose' );
//const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema( {
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    phoneNumber: { type: String, minlength: 10, maxlength: 10, unique: true },
    whatsappNumber: { type: String, minlength: 10, maxlength: 10, },
    status: { type: String, default: 'active' } // active/delete/cancel/approve/ongoing/complete
} );

const User = mongoose.model( 'user', userSchema );

module.exports = User;
