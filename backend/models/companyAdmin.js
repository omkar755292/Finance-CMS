const mongoose = require('mongoose');

const companyAdminSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String },
    companySubUrl: { type: String },
    password: { type: String, required: true},
    role: { type: String, default: 'admin'}, // master,superAdmin,admin
    status: { type: String, default: 'active' },// active,deactive
    createDate:{ type: String},
    LoginData:[{
        token: { type: String},
        createDate: { type: String},
        status: { type: String, default: 'active' },// active,deactive/logout
        entryDate:{ type: String}
    }],

    multiloginCount: { type: String, default:'0'}
});

const Admin = mongoose.model('Admin', companyAdminSchema);

module.exports = Admin;
