const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminId: { type: String, required: true, unique: true }, // corrected from 'amdinId'
    mpin: { type: String, required: true },
    name: { type: String },
    email: { type: String, unique: true }, // changed to optional
    phoneNumber: { type: String, required: true }, // added phoneNumber
    status: { type: String, default: 'active' }, // active/delete/cancel/approve/ongoing/complete
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },

    adminFullData: { type: mongoose.Types.ObjectId, ref: "admin-list" },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
