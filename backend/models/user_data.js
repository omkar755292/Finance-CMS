const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    whatsapp_number: { type: String },
    phone_number: { type: String, required: true },
    profession: { type: String },
    address: { type: String },
    adhar_card_number: { type: String, required: true },
    pan_card_number: { type: String, required: true },
    adhar_docs: { data: Buffer, contentType: String },
    pan_docs: { data: Buffer, contentType: String },
    passport_photo: { type: String },
    user_id: { type: String, required: true },
    father_name: { type: String },
    mother_name: { type: String },
    guardian_name: { type: String },
    company_sub_url: { type: String },
    registration_number: { type: String, required: true }
});

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;
