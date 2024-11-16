const express = require( 'express' );
const authTokenVerification = require( '../middlewares/authMiddleware' );
const userList = require( '../models/userList' );
const incomeTaxOnboarding = require( '../models/incomeTaxOnboarding' );
const incomeTaxReturnFile = require( '../models/incomeTaxReturnFile' );
const company = require( '../models/company' );
const router = express.Router();
const short = require( 'short-uuid' );


router.route( '/new-onboarding' ).post(
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

        const userDataC = await incomeTaxOnboarding.findOne( { companyId, userId } );
        console.log( userDataC );
        if ( userDataC )
        {
            return res.status( 200 ).json( { status: 2, message: 'user already loaded !!!' } );
        }

        const companyData = await company.findOne( { companyId } );
        if ( !companyData )
        {
            return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );
        }

        const createDate = new Date().getTime();

        const newUser = new incomeTaxOnboarding( {
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


router.route( '/all-users' ).post(
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

        const companyData = await company.findOne( { companyId } );
        if ( !companyData )
        {
            return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );
        }

        try
        {


            const allUsers = await incomeTaxOnboarding.find( { companyId } ).populate( 'userFullData' );

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



router.route( '/filling-yr-2324' ).post(
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


        const companyData = await company.findOne( { companyId } );
        if ( !companyData )
        {
            return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );
        }

        const createDate = new Date().getTime();

        const findKyc = await incomeTaxOnboarding.findOne( { companyId, userId } );
        if ( !findKyc )
            return res.status( 200 ).json( { status: 2, message: 'user not found !!!' } );

        try
        {


            const userData = await incomeTaxReturnFile.findOne( { companyId, userId } ).populate(
                {
                    path: 'userOnboardingData',
                    populate: {
                        path: 'userFullData',
                    }
                }
            );

            if ( userData )
            {
                return res.status( 200 ).json( { status: 1, data: userData } );

            }
            else
            {


                const lastServiceSrlNo = parseInt( companyData.lastServiceSrlNo ) + 1;

                const serviceId = companyId + "-ser-" + lastServiceSrlNo;




                const formId = "form-data-" + short.generate().toString();
                const formPassword = "password-data-" + short.generate().toString();;
                console.log( findKyc, findKyc._id );
                const newTaxForm = new incomeTaxReturnFile( {
                    createDate,
                    userId,
                    userOnboardingData: findKyc._id,
                    companyId,
                    updateDate: createDate,
                    fillUpDate: createDate,
                    formId,
                    formPassword,
                    serviceId,
                    status: "active",
                    publicLink: true,
                } );

                await newTaxForm.save();


                // update company lastUserSrlNo
                const lastUserSrlNoUpdate = await company.updateOne( { companyId }, { lastServiceSrlNo } );


                const userData = await incomeTaxReturnFile.findOne( { companyId, userId } ).populate(
                    {
                        path: 'userOnboardingData',
                        populate: {
                            path: 'userFullData',
                        }
                    }
                );
                return res.status( 200 ).json( { status: 1, data: userData } );
            }
            return res.status( 200 ).json( { status: 2, message: "Server issue !!!" } );


        } catch ( error )
        {

            console.error( error );
            return res.status( 200 ).json( { status: 2, message: error } );

        }

    }
);


router.route( '/filling-yr-2324-data-get' ).post(
    authTokenVerification,
    async ( req, res ) =>
    {

        const authUser = req.user;
        const { companyId, formId, serviceId } = req.body;
        const phoneNumberAdmin = authUser.phoneNumber;
        const type = authUser.type;
        const companyIdJ = authUser.companyId;
        if ( type != 'super-admin' ) return res.status( 401 ).send();
        if ( companyId != companyIdJ ) return res.send( 408 );


        const companyData = await company.findOne( { companyId } );
        if ( !companyData )
        {
            return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );
        }

        try
        {

            const userData = await incomeTaxReturnFile.findOne( { companyId, formId, serviceId } ).populate( {
                path: 'userOnboardingData',
                populate: {
                    path: 'userFullData',
                }
            } );

            console.log( userData );

            if ( userData )
            {
                return res.status( 200 ).json( { status: 1, data: userData } );
            }

            return res.status( 200 ).json( { status: 2, message: "Form not found !!!" } );


        } catch ( error )
        {
            console.error( error );
            return res.status( 200 ).json( { status: 2, message: error } );
        }

    }
);

// Todo: public - non auth
router.route( '/filling-yr-2324-data-get-public' ).post(
    async ( req, res ) =>
    {

        const { formId, serviceId, formPassword } = req.body;

        try
        {

            const formData = await incomeTaxReturnFile.findOne( { formId, serviceId, formPassword } ).populate( {
                path: 'userOnboardingData',
                populate: {
                    path: 'userFullData',
                }
            } );

            if ( !formData )
                return res.status( 200 ).json( { status: 2, message: 'Form not found !!!' } );

            return res.status( 200 ).json( { status: 1, data: formData } );

        } catch ( error )
        {
            console.error( error );
            return res.status( 200 ).json( { status: 2, message: error } );
        }

    }
);



router.route( '/filling-yr-2324-save-data' ).post(
    authTokenVerification,
    async ( req, res ) =>
    {

        const authUser = req.user;
        const { companyId, formId, serviceId } = req.body;
        const phoneNumberAdmin = authUser.phoneNumber;
        const type = authUser.type;
        const companyIdJ = authUser.companyId;
        if ( type != 'super-admin' ) return res.status( 401 ).send();
        if ( companyId != companyIdJ ) return res.send( 408 );


        const {
            grossIncome,
            standardDeduction,
            section80C,
            section80CCD_1B,
            section80GG,
            section80TTB,
            professionalTax,
            otherDeduction,
            oldTaxableIncome,
            oldSumOfTaxSlabs,
            newTaxableIncome,
            newSumOfTaxSlabs,
        } = req.body;




        const companyData = await company.findOne( { companyId } );
        if ( !companyData )
        {
            return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );
        }

        try
        {

            const userData = await incomeTaxReturnFile.findOne( { companyId, formId, serviceId } );

            if ( !userData )
                return res.status( 200 ).json( { status: 2, message: 'Form not found !!!' } );


            // update all input
            await incomeTaxReturnFile.updateOne( { companyId, formId, serviceId }, {
                grossIncome,
                standardDeduction,
                section80C,
                section80CCD_1B,
                section80GG,
                section80TTB,
                professionalTax,
                otherDeduction,
                oldTaxableIncome,
                oldSumOfTaxSlabs,
                newTaxableIncome,
                newSumOfTaxSlabs,
                publicLink: false,
                fillUpDate: new Date().getTime(),
                status: "fill-up",
            } );

            return res.status( 200 ).json( { status: 1, message: "Submitted" } );

        } catch ( error )
        {
            console.error( error );
            return res.status( 200 ).json( { status: 2, message: error } );
        }

    }
);


router.route( '/filling-yr-2324-save-data-public' ).post(
    async ( req, res ) =>
    {
        const {
            companyId,
            serviceId,
            formId,
            userId,
            formPassword
        } = req.body;


        const {
            grossIncome,
            standardDeduction,
            section80C,
            section80CCD_1B,
            section80GG,
            section80TTB,
            professionalTax,
            otherDeduction,
            oldTaxableIncome,
            oldSumOfTaxSlabs,
            newTaxableIncome,
            newSumOfTaxSlabs,
        } = req.body;




        const companyData = await company.findOne( { companyId } );
        if ( !companyData )
        {
            return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );
        }

        try
        {

            const userData = await incomeTaxReturnFile.findOne( {
                companyId,
                serviceId,
                formId,
                userId,
                formPassword
            } );

            if ( !userData )
                return res.status( 200 ).json( { status: 2, message: 'Form not found !!!' } );


            // update all input
            await incomeTaxReturnFile.updateOne( {
                companyId,
                serviceId,
                formId,
                userId,
                formPassword
            }, {
                grossIncome,
                standardDeduction,
                section80C,
                section80CCD_1B,
                section80GG,
                section80TTB,
                professionalTax,
                otherDeduction,
                oldTaxableIncome,
                oldSumOfTaxSlabs,
                newTaxableIncome,
                newSumOfTaxSlabs,
                publicLink: false,
                fillUpDate: new Date().getTime(),
                status: "fill-up",
            } );

            return res.status( 200 ).json( { status: 1, message: "Submitted" } );

        } catch ( error )
        {
            console.error( error );
            return res.status( 200 ).json( { status: 2, message: error } );
        }

    }
);


router.route( '/filling-yr-2324-update-data' ).post(
    authTokenVerification,
    async ( req, res ) =>
    {

        const authUser = req.user;
        const { companyId, formId, serviceId } = req.body;
        const phoneNumberAdmin = authUser.phoneNumber;
        const type = authUser.type;
        const companyIdJ = authUser.companyId;
        if ( type != 'super-admin' ) return res.status( 401 ).send();
        if ( companyId != companyIdJ ) return res.send( 408 );


        const companyData = await company.findOne( { companyId } );
        if ( !companyData )
        {
            return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );
        }

        try
        {

            const userData = await incomeTaxReturnFile.findOne( { companyId, formId, serviceId } ).populate( {
                path: 'userOnboardingData',
                populate: {
                    path: 'userFullData',
                }
            } );

            console.log( userData );

            if ( userData )
            {
                return res.status( 200 ).json( { status: 1, data: userData } );
            }

            return res.status( 200 ).json( { status: 2, message: "Form not found !!!" } );


        } catch ( error )
        {
            console.error( error );
            return res.status( 200 ).json( { status: 2, message: error } );
        }

    }
);

module.exports = router;