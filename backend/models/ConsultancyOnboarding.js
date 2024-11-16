const mongoose = require( 'mongoose' );

const consultancySchema = new mongoose.Schema( {
    updateDate: { type: String, required: true },
    createDate: { type: String, required: true },
    userId: { type: String, required: true },
    userFullData: { type: mongoose.Types.ObjectId, ref: "user-list" },
    consultancyLists: [ { type: mongoose.Types.ObjectId, ref: "consultancy" } ],
    companyId: { type: String, required: true },
    status: { type: String, default: 'active' } // active/delete/cancel/approve/ongoing/complete
} );

const ConsultancyOnboarding = mongoose.model( 'consultancy-onboarding', consultancySchema );

module.exports = ConsultancyOnboarding;
