const mongoose = require( 'mongoose' );

const companySchema = new mongoose.Schema( {
    companyName: { type: String, required: true },
    companyId: { type: String, required: true, unique: true },
    createDate: { type: String, required: true },
    subscriptionAmount: { type: Number, min: 0, default: 0 },
    nextSubscriptionDate: { type: String },
    subscriptionPeriod: { type: String }, //monthly/yearly
    lastUserSrlNo: { type: Number, default: 1 },
    lastServiceSrlNo: { type: Number, default: 0 },
    adminMail: { type: String },
    status: { type: String, default: 'active' }
} );


const Company = mongoose.model( 'company', companySchema );


module.exports = Company;
