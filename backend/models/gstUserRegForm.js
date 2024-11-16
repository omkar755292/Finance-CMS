const mongoose = require( 'mongoose' );

const schema = new mongoose.Schema( {
    updateDate: { type: String, required: true },
    createDate: { type: String, required: true },
    expDate: { type: String, required: false },
    fillUpDate: { type: String, required: false },
    openDate: [ { type: String, required: false } ],


    formId: { type: String, required: true },
    formPassword: { type: String, required: true },


    userId: { type: String, required: true },
    status: { type: String, default: 'active' },                // active/fill-up
    publicLink: { type: Boolean, default: true },                // active/fill-up

    serviceId: { type: String, required: true },


    questions: [ {
        questionId: { type: String, required: true },
        answer: { type: String, required: true },
    } ],



    // userId: { type: String, required: true },
    userOnboardingData: { type: mongoose.Types.ObjectId, ref: "gst-onboarding" },
    questionPackData: { type: mongoose.Types.ObjectId, ref: "gst-question-pack" },

    companyId: { type: String, required: true },
    formName: { type: String, required: true },
    status: { type: String, default: 'active' }         // active/cancel/fill-up
} );

const gstUserForm = mongoose.model( 'gst-user-reg-form', schema );

module.exports = gstUserForm;