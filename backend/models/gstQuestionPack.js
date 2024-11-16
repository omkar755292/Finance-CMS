const mongoose = require( 'mongoose' );

const Schema = new mongoose.Schema( {
    updateDate: { type: String, required: true },
    createDate: { type: String, required: true },
    formName: { type: String, required: true },
    questionId: { type: String, required: true },

    questions: [ {
        questionType: { type: String, required: true }, // text/number/date/time/date-time/file
        question: { type: String, required: true },
        questionId: { type: String, required: true },
        status: { type: String, required: true } // active/de-active

    } ],

    companyId: { type: String, required: true },
    status: { type: String, default: 'active' } // active/delete/cancel/approve/ongoing/complete
} );

const gstQuestionPack = mongoose.model( 'gst-question-pack', Schema );

module.exports = gstQuestionPack;