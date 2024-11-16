const mongoose = require( 'mongoose' );

const adminListSchema = new mongoose.Schema( {
    name: { type: String },
    position: { type: String, default: "admin" },                 // Todo: admin, super-admin
    email: { type: String, unique: true },
    phoneNumber: { type: String },
    whatsappNumber: { type: String },
    // address: { type: String },
    // pinCode: { type: String },
    // city: { type: String },
    // state: { type: String },
    // panNumber: { type: String },
    // aadhaarNumber: { type: String },
    // fatherName: { type: String },
    // motherName: { type: String },
    // occupation: { type: String },
    // panPdf: { type: String },
    // aadhaarPdf: { type: String },
    // profileImage: { type: String },
    // updateDate: { type: String, required: true },
    // createDate: { type: String, required: true },
    // roll: [
    //     {
    //         type: { type: String, required: true },     //Todo: SIP, GST, IncomeTax, Insurance, consultancy, Admin-List, User-List
    //         access: { type: String, required: true }    //Todo: Read, Edit, Add-New-User, Delete, Full Access
    //     }
    // ],
    userId: { type: String, required: true, unique: true },
    companyId: { type: String, required: true },
    createDate: { type: String, required: true },
    updateDate: { type: String, required: true },
    companyFullData: { type: mongoose.Types.ObjectId, ref: "company", required: true, },


    userDataRoll: { type: String, required: true, default: 'priority-0' },  // Todo: priority-0 , priority-1 , priority-2 , priority-3 , priority-4 , priority-5
    adminDataRoll: { type: String, required: true, default: 'priority-0' },  // Todo: priority-0 , priority-1 , priority-2 , priority-3 , priority-4 , priority-5
    sipServiceRoll: { type: String, required: true, default: 'priority-0' },  // Todo: priority-0 , priority-1 , priority-2 , priority-3 , priority-4 , priority-5
    gstServiceRoll: { type: String, required: true, default: 'priority-0' },  // Todo: priority-0 , priority-1 , priority-2 , priority-3 , priority-4 , priority-5
    incomeServiceRoll: { type: String, required: true, default: 'priority-0' },  // Todo: priority-0 , priority-1 , priority-2 , priority-3 , priority-4 , priority-5
    insuranceServiceRoll: { type: String, required: true, default: 'priority-0' },  // Todo: priority-0 , priority-1 , priority-2 , priority-3 , priority-4 , priority-5
    consultancyServiceRoll: { type: String, required: true, default: 'priority-0' },  // Todo: priority-0 , priority-1 , priority-2 , priority-3 , priority-4 , priority-5

} );

const AdminList = mongoose.model( 'admin-list', adminListSchema );

module.exports = AdminList;
