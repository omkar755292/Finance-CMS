const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema({
    updateDate: { type: String, required: true },
    createDate: { type: String, required: true },
    userId: { type: String, required: true },
    userFullData: { type: mongoose.Types.ObjectId, ref: "user-list" },
    companyId: { type: String, required: true },
    status: { type: String, default: 'active' } // active/delete/cancel/approve/ongoing/complete
});

const insurenceOnboarding = mongoose.model('insurance-onboarding', insuranceSchema);

module.exports = insurenceOnboarding;