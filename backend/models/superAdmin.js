const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    adminId: { type: String, required: true, unique: true },
    mpin: { type: String, required: true },
    adminName: { type: String },
    adminEmail: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    role: { type: String, default: 'super-admin' },
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
});

const SuperAdmin = mongoose.model('Super-Admin', schema);

module.exports = SuperAdmin;
