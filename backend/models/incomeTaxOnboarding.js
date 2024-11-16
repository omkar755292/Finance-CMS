const mongoose = require( 'mongoose' );

const mySchema = new mongoose.Schema( {
    updateDate: { type: String, required: true },
    createDate: { type: String, required: true },
    userId: { type: String, required: true },
    userFullData: { type: mongoose.Types.ObjectId, ref: "user-list" },
    companyId: { type: String, required: true },
    status: { type: String, default: 'active' } // active/delete/cancel/approve/ongoing/complete
} );

const incomeTaxOnboardingModel = mongoose.model( 'income-tax-onboarding', mySchema );

module.exports = incomeTaxOnboardingModel;