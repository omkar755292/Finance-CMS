const express = require( 'express' );
const authTokenVerification = require( '../middlewares/authMiddleware' );
const userList = require( '../models/userList' );
const insuranceOnboarding = require( '../models/insuranceOnboarding' );
const company = require( '../models/company' );
const Company = require( '../models/company' );
const InsuranceService = require( '../models/InsuranceService' );
const { trusted } = require( 'mongoose' );
const router = express.Router();



const multer = require( 'multer' );
const path = require( 'path' );
const fs = require( "fs" );
const short = require( 'short-uuid' );




// Storage engine setup for Multer
const storage = multer.diskStorage( {
    destination: '',
    filename: ( req, file, cb ) =>
    {
        const { companyId } = req.body;

        // console.log( req );
        // get year and month
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        const path1 = "./uploads";
        const path2 = path1 + "/temp";
        const path3 = path2 + "/" + companyId;
        const path4 = path3 + "/encrypted-files";
        const path5 = path4 + "/insurance-data";

        // create folder if not exist
        if ( !fs.existsSync( path1 ) )
        {
            fs.mkdirSync( path1 );
        }
        if ( !fs.existsSync( path2 ) )
        {
            fs.mkdirSync( path2 );
        }
        if ( !fs.existsSync( path3 ) )
        {
            fs.mkdirSync( path3 );
        }
        if ( !fs.existsSync( path4 ) )
        {
            fs.mkdirSync( path4 );
        }
        if ( !fs.existsSync( path5 ) )
        {
            fs.mkdirSync( path5 );
        }

        const fileName = short.generate();

        return cb( null, `${ path5 }/${ fileName }${ path.extname( file.originalname ) }` )
    }
} );

const upload = multer( { storage: storage } );

router.post(
    '/new-onboarding',
    authTokenVerification,
    async ( req, res ) =>
    {

        const authUser = req.user;
        const { companyId } = req.body;
        const phoneNumberAdmin = authUser.phoneNumber;
        const type = authUser.type;
        const companyIdJ = authUser.companyId;
        if ( type != 'super-admin' ) return res.status( 401 ).send();
        if ( companyId != companyIdJ ) return res.send( 408 );


        const { userId } = req.body;


        const userData = await userList.findOne( { userId, companyId } );
        console.log( userData );
        if ( !userData )
        {
            return res.status( 200 ).json( { status: 2, message: 'user not found !!!' } );
        }

        const userDataC = await insuranceOnboarding.findOne( { companyId, userId } );
        console.log( userDataC );
        if ( userDataC )
        {
            return res.status( 200 ).json( { status: 2, message: 'user already loaded !!!' } );
        }

        const companyData = await Company.findOne( { companyId } );
        if ( !companyData )
        {
            return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );
        }

        const createDate = new Date().getTime();

        const newUser = new insuranceOnboarding( {
            createDate,
            userId,
            userFullData: userData._id,
            companyId,
            updateDate: createDate,

        } );

        await newUser.save();
        return res.status( 200 ).json( { status: 1, message: "Data added !!!" } );


    }
);


router.post(
    '/all-users',
    authTokenVerification,
    async ( req, res ) =>
    {

        const authUser = req.user;
        const { companyId } = req.body;
        const phoneNumberAdmin = authUser.phoneNumber;
        const type = authUser.type;
        const companyIdJ = authUser.companyId;
        if ( type != 'super-admin' ) return res.status( 401 ).send();
        if ( companyId != companyIdJ ) return res.send( 408 );


        try
        {


            const allUsers = await insuranceOnboarding.find( { companyId } ).populate( 'userFullData' );

            if ( allUsers )
            {
                return res.status( 200 ).json( { status: 1, data: allUsers } );

            }
            else
            {
                return res.status( 200 ).json( { status: 2, message: "No data found ..." } );
            }


        } catch ( error )
        {

            console.error( error );
            return res.status( 200 ).json( { status: 2, message: error } );

        }
    }
);


router.post(
    '/all-services',
    authTokenVerification,
    async ( req, res ) =>
    {

        const authUser = req.user;
        const { companyId, userId } = req.body;
        const phoneNumberAdmin = authUser.phoneNumber;
        const type = authUser.type;
        const companyIdJ = authUser.companyId;
        if ( type != 'super-admin' ) return res.status( 401 ).send();
        if ( companyId != companyIdJ ) return res.send( 408 );



        try
        {
            const allServices = await InsuranceService
                .find( { userId, companyId } )
                .populate( {
                    path: 'insuranceOnboardingData',
                    populate: {
                        path: 'userFullData',
                        // model: 'company'
                    }
                } );

            console.log( allServices );
            if ( allServices.length > 0 )
                return res.status( 200 ).json( { status: 1, data: allServices } );

            return res.status( 200 ).json( { status: 2, message: "No data found ..." } );
        } catch ( error )
        {
            console.error( error );
            return res.status( 200 ).json( { status: 2, message: error } );
        }
    }
);


router.post(
    '/reg-insurance-form',
    authTokenVerification,
    async ( req, res ) =>
    {

        try
        {
            const authUser = req.user;
            const { companyId, userId } = req.body;
            const phoneNumberAdmin = authUser.phoneNumber;
            const type = authUser.type;
            const companyIdJ = authUser.companyId;
            if ( type != 'super-admin' ) return res.status( 401 ).send();
            if ( companyId != companyIdJ ) return res.send( 408 );
            const { data, insuranceType, insuranceName } = req.body;


            const userData = await userList.findOne( { userId, companyId } );
            // console.log( userData );
            if ( !userData )
            {
                return res.status( 200 ).json( { status: 2, message: 'user not found !!!' } );
            }

            const userDataC = await insuranceOnboarding.findOne( { userId, companyId } );
            if ( !userDataC )
            {
                return res.status( 200 ).json( { status: 2, message: "user not found ..." } );
            }
            console.log( userDataC );


            const companyData = await company.findOne( { companyId } );
            if ( !companyData )
            {
                return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );
            }


            const lastServiceSrlNo = parseInt( companyData.lastServiceSrlNo ) + 1;

            const serviceId = companyId + "-ser-" + lastServiceSrlNo;
            const createDate = new Date().getTime();



            console.log( userDataC._id );

            const newForm = await InsuranceService( {
                insuranceName,
                insuranceType,
                insuranceType,
                createDate,
                updateDate: createDate,
                userId,
                companyId,
                serviceId,
                serviceData: data,

                insuranceOnboardingData: userDataC._id,
            } )

            await newForm.save();

            // update company lastUserSrlNo
            const lastUserSrlNoUpdate = await company.updateOne( { companyId }, { lastServiceSrlNo } );

            return res.status( 200 ).json( { status: 1, message: "Data added !!!" } );


        } catch ( error )
        {

            console.error( error );
            return res.status( 200 ).json( { status: 2, message: error } );

        }
    }
);

router.post(
    '/one-insurance-data',
    authTokenVerification,
    async ( req, res ) =>
    {

        const authUser = req.user;
        const { companyId, userId, serviceId } = req.body;
        const phoneNumberAdmin = authUser.phoneNumber;
        const type = authUser.type;
        const companyIdJ = authUser.companyId;
        if ( type != 'super-admin' ) return res.status( 401 ).send();
        if ( companyId != companyIdJ ) return res.send( 408 );


        try
        {

            const userData = await userList.findOne( { userId, companyId } );
            if ( !userData )
                return res.status( 200 ).json( { status: 2, message: 'user not found !!!' } );


            const userDataC = await insuranceOnboarding.findOne( { userId, companyId } );
            if ( !userDataC )
                return res.status( 200 ).json( { status: 2, message: "user not found ..." } );



            const companyData = await company.findOne( { companyId } );
            if ( !companyData )
                return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );



            const insuranceData = await InsuranceService.findOne( { userId, companyId, serviceId } );
            if ( !insuranceData )
                return res.status( 200 ).json( { status: 2, message: "Insurance data not found" } );


            return res.status( 200 ).json( { status: 1, data: insuranceData } );



        } catch ( error )
        {

            console.error( error );
            return res.status( 200 ).json( { status: 2, message: error } );

        }
    }
);

router.post(
    '/insurance-claim-form-submit',
    authTokenVerification,
    upload.fields( [ { name: 'claimDocuments', maxCount: 1 }, { name: 'companyDocuments', maxCount: 1 } ] ),

    async ( req, res ) =>
    {

        const authUser = req.user;

        // const { companyId, userId, fillUpDate, serviceId, claimedDate, reason, issuingDate, claimDocuments, companyDocuments } = req.body;
        const { companyId, userId, serviceId, fillUpDate, claimedDate, reason, issuingDate } = req.body;
        const phoneNumberAdmin = authUser.phoneNumber;
        const type = authUser.type;
        const companyIdJ = authUser.companyId;
        if ( type != 'super-admin' ) return res.status( 401 ).send();
        if ( companyId != companyIdJ ) return res.send( 408 );


        const userData = await userList.findOne( { userId, companyId } );
        if ( !userData )
            return res.status( 200 ).json( { status: 2, message: 'user not found !!!' } );


        const userDataC = await insuranceOnboarding.findOne( { userId, companyId } );
        if ( !userDataC )
            return res.status( 200 ).json( { status: 2, message: "user not found ..." } );



        const companyData = await company.findOne( { companyId } );
        if ( !companyData )
            return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );



        const insuranceData = await InsuranceService.findOne( { userId, companyId, serviceId } );
        if ( !insuranceData )
            return res.status( 200 ).json( { status: 2, message: "Insurance data not found" } );

        try
        {

            const claimId = short.generate();

            const path1 = "./uploads";
            const path2 = path1 + "/confidential";
            const path3 = path2 + "/" + companyId;
            const path4 = path3 + "/encrypted-files";
            const path5 = path4 + "/insurance-data";

            // create folder if not exist
            if ( !fs.existsSync( path1 ) )
                fs.mkdirSync( path1 );
            if ( !fs.existsSync( path2 ) )
                fs.mkdirSync( path2 );
            if ( !fs.existsSync( path3 ) )
                fs.mkdirSync( path3 );
            if ( !fs.existsSync( path4 ) )
                fs.mkdirSync( path4 );
            if ( !fs.existsSync( path5 ) )
                fs.mkdirSync( path5 );

            var companyDocuments = "";
            var claimDocuments = "";


            if ( req.files[ 'companyDocuments' ] && req.files[ 'companyDocuments' ][ 0 ] )
            {
                const companyDocumentsT = req.files[ 'companyDocuments' ][ 0 ].filename;
                companyDocuments = `${ path5 }/${ serviceId }_${ claimId }_companyDocuments${ path.extname( companyDocumentsT ) }`;
                fs.rename( companyDocumentsT, companyDocuments, function ( err )
                {
                    if ( err )
                    {
                        companyDocuments = companyDocumentsT;
                    }
                } );
            }

            if ( req.files[ 'claimDocuments' ] && req.files[ 'claimDocuments' ][ 0 ] )
            {
                const claimDocumentsT = req.files[ 'claimDocuments' ][ 0 ].filename;
                claimDocuments = `${ path5 }/${ serviceId }_${ claimId }_claimDocuments${ path.extname( claimDocumentsT ) }`;
                fs.rename( claimDocumentsT, claimDocuments, function ( err )
                {
                    if ( err )
                    {
                        claimDocuments = claimDocumentsT;
                    }
                } );
            }


            const updatedInsuranceService = await InsuranceService.updateOne(
                { userId, companyId, serviceId },
                {
                    $push: {
                        claimedData: {
                            claimDocuments,
                            companyDocuments,
                            fillUpDate,
                            claimedDate,
                            reason,
                            issuingDate
                        }
                    }
                },
                { new: true }
            );

            return res.status( 200 ).json( { status: 1, message: "Data updated !!!" } );




        } catch ( error )
        {

            console.error( error );
            return res.status( 200 ).json( { status: 2, message: error } );

        }

        return res.status( 200 ).json( { status: 1, message: "Data added !!!" } );
    }

);


router.post(
    '/add-support-documents',
    authTokenVerification,
    upload.fields( [ { name: 'documents', maxCount: 1 } ] ),

    async ( req, res ) =>
    {

        const authUser = req.user;

        const { companyId, userId, serviceId, docInfo } = req.body;
        const phoneNumberAdmin = authUser.phoneNumber;
        const type = authUser.type;
        const companyIdJ = authUser.companyId;
        if ( type != 'super-admin' ) return res.status( 401 ).send();
        if ( companyId != companyIdJ ) return res.send( 408 );


        const userData = await userList.findOne( { userId, companyId } );
        if ( !userData )
            return res.status( 200 ).json( { status: 2, message: 'user not found !!!' } );


        const userDataC = await insuranceOnboarding.findOne( { userId, companyId } );
        if ( !userDataC )
            return res.status( 200 ).json( { status: 2, message: "user not found ..." } );



        const companyData = await company.findOne( { companyId } );
        if ( !companyData )
            return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );



        const insuranceData = await InsuranceService.findOne( { userId, companyId, serviceId } );
        if ( !insuranceData )
            return res.status( 200 ).json( { status: 2, message: "Insurance data not found" } );

        try
        {

            const documentsId = short.generate();

            const path1 = "./uploads";
            const path2 = path1 + "/confidential";
            const path3 = path2 + "/" + companyId;
            const path4 = path3 + "/encrypted-files";
            const path5 = path4 + "/insurance-data";

            // create folder if not exist
            if ( !fs.existsSync( path1 ) )
                fs.mkdirSync( path1 );
            if ( !fs.existsSync( path2 ) )
                fs.mkdirSync( path2 );
            if ( !fs.existsSync( path3 ) )
                fs.mkdirSync( path3 );
            if ( !fs.existsSync( path4 ) )
                fs.mkdirSync( path4 );
            if ( !fs.existsSync( path5 ) )
                fs.mkdirSync( path5 );

            var documents = "";


            if ( req.files[ 'documents' ] && req.files[ 'documents' ][ 0 ] )
            {
                const documentsT = req.files[ 'documents' ][ 0 ].filename;
                documents = `${ path5 }/${ serviceId }_${ documentsId }_documents${ path.extname( documentsT ) }`;
                fs.rename( documentsT, documents, function ( err )
                {
                    if ( err )
                    {
                        documents = documentsT;
                    }
                } );
            }

            await InsuranceService.updateOne(
                { userId, companyId, serviceId },
                {
                    $push: {
                        supportDocsData: {
                            documents,
                            docInfo
                        }
                    }
                },
                { new: true }
            );

            const updatedInsuranceService = await InsuranceService.findOne( { userId, companyId, serviceId } );

            return res.status( 200 ).json( { status: 1, data: updatedInsuranceService, message: "Data updated !!!" } );

        } catch ( error )
        {

            console.error( error );
            return res.status( 200 ).json( { status: 2, message: error } );

        }

        return res.status( 200 ).json( { status: 1, message: "Data added !!!" } );
    }

);












module.exports = router;