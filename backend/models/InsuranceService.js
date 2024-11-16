const mongoose = require( 'mongoose' );

const schema = new mongoose.Schema( {




    insuranceName: { type: String },
    insuranceType: { type: String, required: false },
    price: { type: String },
    paymentType: { type: String },

    serviceData: { type: Object, required: true, },
    supportDocsData: [ {
        docInfo: { type: String },
        documents: { type: String },
    } ],

    claimedData: [ {
        issuingDate: { type: String },
        claimedDate: { type: String },
        fillUpDate: { type: String },
        reason: { type: String },
        status: { type: String },
        claimDocuments: { type: String },
        companyDocuments: { type: String },
        claimId: { type: String, required: true },
    } ],

    status: { type: String, default: 'active' },
    updateDate: { type: String, required: true },
    createDate: { type: String, required: true },

    userId: { type: String, required: true },
    serviceId: { type: String, required: true, unique: true },
    companyId: { type: String, required: true },

    insuranceOnboardingData: { type: mongoose.Types.ObjectId, ref: "insurance-onboarding" },

} );


const InsuranceServiceModel = mongoose.model( 'insurance-service-data', schema );

module.exports = InsuranceServiceModel;



