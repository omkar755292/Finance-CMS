const mongoose = require( 'mongoose' );


const consultancySchema = new mongoose.Schema( {
    // assignedBy: [ {
    //     ID: { type: String, required: true },
    //     role: { type: String, enum: [ 'read', 'write', 'name' ], required: true }
    // } ],
    createDate: { type: String },
    subject: { type: String },
    category: { type: String, required: false },
    subCategory: { type: String },
    status: { type: String, default: 'active' }, // active/delete/cancel/approve/ongoing/complete
    note: { type: String },
    price: { type: String },
    paymentType: { type: String },
    quotations: [ {
        entryTime: { type: String },
        note: { type: String },
    } ],
    userId: { type: String, required: true },
    serviceId: { type: String, required: true, unique: true },
    companyId: { type: String, required: true },

    consultancyOnboardingData: { type: mongoose.Types.ObjectId, ref: "consultancy-onboarding" },
} );

const Consultancy = mongoose.model( 'consultancy', consultancySchema );

module.exports = Consultancy;
