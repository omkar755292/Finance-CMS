const mongoose = require( 'mongoose' );

const sipSchema = new mongoose.Schema( {
    updateDate: { type: String, required: true },
    createDate: { type: String, required: true },

    fillUpDate: { type: String, required: false },

    formId: { type: String, required: true },
    formPassword: { type: String, required: true },

    userId: { type: String, required: true },

    userOnboardingData: { type: mongoose.Types.ObjectId, ref: "income-tax-onboarding" },

    serviceId: { type: String, required: true },
    companyId: { type: String, required: true },
    status: { type: String, default: 'active' },                // active/fill-up
    publicLink: { type: Boolean, default: true },                // active/fill-up






    // Todo: fill up from pdf ..................................
    grossIncome: { type: Number, default: 0 },
    standardDeduction: { type: Number, default: 0 },
    section80C: { type: Number, default: 0 },
    section80CCD_1B: { type: Number, default: 0 },
    section80GG: { type: Number, default: 0 },
    section80TTB: { type: Number, default: 0 },
    professionalTax: { type: Number, default: 0 },
    otherDeduction: { type: Number, default: 0 },
    totalTax: { type: Number, default: 0 },
    totalTaxPayable: { type: Number, default: 0 },
    totalTaxPaid: { type: Number, default: 0 },
    oldTaxableIncome: { type: Number, default: 0 },
    oldSumOfTaxSlabs: { type: Number, default: 0 },
    newTaxableIncome: { type: Number, default: 0 },
    newSumOfTaxSlabs: { type: Number, default: 0 },


} );

const sipOnboardingModel = mongoose.model( 'income-tax-return-file', sipSchema );

module.exports = sipOnboardingModel;