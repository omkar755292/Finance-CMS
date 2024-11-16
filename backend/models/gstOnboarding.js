const mongoose = require( 'mongoose' );

const gstSchema = new mongoose.Schema( {
    updateDate: { type: String, required: true },
    createDate: { type: String, required: true },
    userId: { type: String, required: true },
    userFullData: { type: mongoose.Types.ObjectId, ref: "user-list" },
    gstRegDataList: [ { type: mongoose.Types.ObjectId, ref: "gst-user-reg-form" } ],
    companyId: { type: String, required: true },
    status: { type: String, default: 'active' },                // active/delete/cancel/approve/ongoing/complete
    gstCertificate: { type: String },                           // Todo: new question
} );

const gstOnboardingModel = mongoose.model( 'gst-onboarding', gstSchema );

module.exports = gstOnboardingModel;