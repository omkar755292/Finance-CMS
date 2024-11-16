const mongoose = require( 'mongoose' );

const sipDataSchema = new mongoose.Schema( {

    userId: { type: String, required: true },
    sipId: { type: String, required: true },
    sipCompanyId: { type: String, required: true },

    companyId: { type: String, required: true },
    updateDate: { type: String, required: true },
    createDate: { type: String, required: true },
    closingAmount: { type: Number, required: true, default: 0 },


    productsAmount: { type: Number, min: 0 },
    productsName: { type: String },
    productId: { type: String },
    productsRenewDates: [ { type: Number, min: 1, max: 30 } ],

    renewTimes: [ {
        timeStamp: { type: String, required: true },
        year: { type: String, required: true },
        month: { type: String, required: true },
        day: { type: String, required: true },
        date: { type: String, required: true },
        amount: { type: Number, required: true },
        previousAmount: { type: Number, required: true },
        closingAmount: { type: Number, required: true },
    } ],

    serviceId: { type: String, required: true, unique: true },

    status: { type: String, enum: [ 'active', 'close' ], default: 'active' },

    sipCompanyData: { type: mongoose.Types.ObjectId, ref: "sip-company-data" },
    sipOnboardingData: { type: mongoose.Types.ObjectId, ref: "sip-onboarding" },

} );

const SIPData = mongoose.model( 'sip-user-data', sipDataSchema );

module.exports = SIPData;
