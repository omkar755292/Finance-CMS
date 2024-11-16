const mongoose = require( 'mongoose' );

const userListSchema = new mongoose.Schema( {
    name: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    whatsappNumber: { type: String },
    address: { type: String },
    pinCode: { type: String },
    city: { type: String },
    state: { type: String },
    panNumber: { type: String },
    aadhaarNumber: { type: String },
    fatherName: { type: String },
    motherName: { type: String },
    occupation: { type: String },
    panPdf: { type: String },
    aadhaarPdf: { type: String },
    profileImage: { type: String },
    updateDate: { type: String, required: true },
    createDate: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    companyId: { type: String, required: true },
    status: { type: String, default: 'active' } // active/delete/cancel/approve/ongoing/complete

} );

const userList = mongoose.model( 'user-list', userListSchema );

module.exports = userList;
