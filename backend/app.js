// app.js
const express = require( 'express' );
const dotenv = require( 'dotenv' );
const mongoose = require( 'mongoose' );
const cors = require( 'cors' );

const fs = require( 'fs' );
const path = require( 'path' );
const cron = require( 'node-cron' );

const authRoutes = require( './routes/authRoutes' );
const companyRoutes = require( './routes/companyRoutes' );
const adminUserListRoutes = require( './routes/adminUserListRoutes' );
const adminAdminListRoutes = require( './routes/adminAdminListRoutes' );
// const userListRoutes = require( './routes/userListRoutes' );
const { createCode } = require( './controllers/createCode' );

const adminConsultancyRoutes = require( './routes/consultancyRoutes' );
const adminIncomeTaxRoutes = require( './routes/icomeTaxRoutes' );
const adminInsuranceRoutes = require( './routes/insurenceRoutes' );
const adminGstRoutes = require( './routes/gstRoutes' );
const adminSipRoutes = require( './routes/sipRoutes' );



dotenv.config();
const app = express();

// Middleware
app.use( express.json() );



// Routes
app.use( cors(
    {
        origin: '*',
        // origin: 'http://localhost:3000',
        // credentials: true,
    }
) );

// Middleware to log API requests
app.use( ( req, res, next ) =>
{
    console.log( `Requested API: ${ req.method } ${ req.originalUrl }` );
    next();
} );

// Todo: Authentication Side code
app.use( '/auth', authRoutes );


// Todo: Master Side code
app.use( '/master/company', companyRoutes );

// Todo: Admin Side code
app.use( '/admin/user-list', adminUserListRoutes );
app.use( '/admin/admin-list', adminAdminListRoutes );

// Todo: Admin Routes
app.use( '/admin/sip', adminSipRoutes );
app.use( '/admin/consultancy', adminConsultancyRoutes );
app.use( '/admin/gst', adminGstRoutes );
app.use( '/admin/income-tax', adminIncomeTaxRoutes );
app.use( '/admin/insurance', adminInsuranceRoutes );
app.use( '/admin/admin-user', adminConsultancyRoutes );


// Todo: get methods for all
app.get( '/barcode/:text', createCode );





app.use( '/dashboard/company', companyRoutes );
// app.use( '/userList', userListRoutes );




app.get( '/download-name', async ( req, res ) =>
{
    try
    {
        // const filePath = req.params.filePath;
        const { filePath } = req.query;

        // Check if the file exists
        if ( fs.existsSync( filePath ) )
        {

            const fileName = path.basename( filePath );


            return res.status( 200 ).send( { status: 1, fileName } );

        } else
        {
            return res.status( 200 ).send( { status: 2, message: "File not found" } );
        }

    } catch ( error )
    {
        console.error( error );
        res.status( 500 ).send( 'Error updating order' );
    }
} );

app.get( '/download', async ( req, res ) =>
{
    try
    {
        // const filePath = req.params.filePath;
        const { filePath } = req.query;

        // Check if the file exists
        if ( fs.existsSync( filePath ) )
        {

            const fileName = path.basename( filePath );

            res.setHeader( 'content-disposition', `attachment; filename=` + fileName );
            res.setHeader( 'content-type', 'application/octet-stream' );

            const fileStream = fs.createReadStream( filePath );
            return fileStream.pipe( res );
        } else
        {
            return res.status( 202 ).send( 'File not found' );
        }

    } catch ( error )
    {
        console.error( error );
        res.status( 500 ).send( 'Error updating order' );
    }
} );

const sipUserData = require( './models/sipUserData' );

// Define your cron job
// Define your cron job to run every day at 10 AM
// cron.schedule( '0 10 * * *', async () =>
// cron.schedule( '* * * * * *', async () =>
cron.schedule( '0 */2 * * *', async () =>
{
    console.log( 'Cron job running every day at 10 AM' );
    // Todo: get date, month, and day
    const todayDate = new Date();
    const year = todayDate.getFullYear();
    const month = todayDate.getMonth() + 1;
    const day = todayDate.getDate();
    var date = year.toString() + "-" + month.toString() + "-" + day.toString();

    console.log( date );




    // Todo: get all sip, where date == today
    const allSIPUser = await sipUserData.find( {
        productsRenewDates: day,
        status: 'active',
        'renewTimes.date': {
            $nin: date
        }
    } );

    console.log( allSIPUser );
    console.log( "allSIPUser" );

    // Todo: use loop of allSIPUser
    for ( let i = 0; i < allSIPUser.length; i++ )
    {
        const oneService = allSIPUser[ i ];

        const amount = parseInt( oneService.productsAmount );
        const previousAmount = parseInt( oneService.closingAmount );
        const closingAmount = parseInt( previousAmount + amount );

        await sipUserData.updateOne( {
            _id: oneService._id,
            sipId: oneService.sipId,
            userId: oneService.userId,
            sipCompanyId: oneService.sipCompanyId,
            status: 'active',
            'renewTimes.date': {
                $nin: date
            }
        }, {
            $push: {
                renewTimes: {
                    timeStamp: Date.now(),
                    year: year,
                    month: month,
                    day: day,
                    date: date,
                    amount: amount,
                    previousAmount: previousAmount,
                    closingAmount: closingAmount

                }
            },
            $set: { closingAmount: closingAmount }
        }, { new: true } );

    }

} );

// cron.schedule( '* * * * * *', async () =>
// {
//     console.log( 'Cron job running every day at 10 AM' );
//     // now time log
//     const time = new Date()
//     console.log( time );

// } );




// Start the server
const PORT = process.env.PORT || 3002;
app.listen( PORT, () =>
{
    console.log( `Server started on port ${ PORT }` );
} );

// Connect to MongoDB
mongoose.connect( process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true } )
    .then( () => console.log( 'Connected to MongoDB' ) )
    .catch( error => console.error( 'MongoDB connection error:', error ) );

