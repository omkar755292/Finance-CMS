const mongoose = require( 'mongoose' );

const sipMasterSchema = new mongoose.Schema( {
    sipCompanyId: { type: String, required: true },
    sipCompanyName: { type: String, required: true },
    productList: [ {
        name: { type: String, required: true },
        renewTimePM: { type: Number, min: 1, max: 30 },
        // amount: { type: String },
        // date: { type: String }
    } ],


    companyId: { type: String, required: true },


    status: { type: String, enum: [ 'active', 'close' ], default: 'active' },
    updateDate: { type: String, required: true },
    createDate: { type: String, required: true },

} );

const SIPMaster = mongoose.model( 'sip-company-data', sipMasterSchema );

module.exports = SIPMaster;
