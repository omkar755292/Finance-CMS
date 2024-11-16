const express = require( 'express' );
const authTokenVerification = require( '../middlewares/authMiddleware' );
const userList = require( '../models/userList' );
const sipOnboarding = require( '../models/sipOnboarding' );
const company = require( '../models/company' );
const sipCompanyData = require( '../models/sipCompanyData' );
const sipUserData = require( '../models/sipUserData' );
const short = require( 'short-uuid' );


const router = express.Router();

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
        if ( companyId != companyIdJ ) return res.status( 408 );



        const { userId } = req.body;


        const userData = await userList.findOne( { userId, companyId } );
        console.log( userData );
        if ( !userData )
        {
            return res.status( 200 ).json( { status: 2, message: 'user not found !!!' } );
        }


        const userDataC = await sipOnboarding.findOne( { companyId, userId } );
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

        const newUser = new sipOnboarding( {
            createDate,
            userId,
            userFullData: userData._id,
            companyId,
            updateDate: createDate,
        } );

        await newUser.save();
        return res.status( 200 ).json( { status: 1, message: "Data added !!!" } );

    } );



router.post( '/all-users', authTokenVerification, async ( req, res ) =>
{


    const authUser = req.user;
    const { companyId } = req.body;
    const phoneNumberAdmin = authUser.phoneNumber;
    const type = authUser.type;
    const companyIdJ = authUser.companyId;
    if ( type != 'super-admin' ) return res.status( 401 ).send();
    if ( companyId != companyIdJ ) return res.send( 408 );
    console.log( '111' );


    try
    {
        const allUsers = await sipOnboarding.find( { companyId } ).populate( 'userFullData' );

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
} );


router.post( '/sip-company-reg', authTokenVerification, async ( req, res ) =>
{

    const authUser = req.user;
    const phoneNumberAdmin = authUser.phoneNumber;
    const { sipCompanyName, companyId } = req.body;
    const type = authUser.type;
    const companyIdJ = authUser.companyId;
    if ( type != 'super-admin' ) return res.status( 401 ).send();
    if ( companyId != companyIdJ ) return res.status( 408 );


    const companyData = await company.findOne( { companyId } );
    if ( !companyData )
    {
        return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );
    }

    try
    {


        const sipCompanyDataGet = await sipCompanyData.findOne( { sipCompanyName, companyId } );
        console.log( sipCompanyDataGet );
        if ( !sipCompanyDataGet )
        {

            const createDate = new Date().getTime();
            const sipCompanyId = short.generate().toString();

            const newCompany = new sipCompanyData( {
                createDate,
                sipCompanyName,
                companyId,
                sipCompanyId,
                updateDate: createDate,
            } );

            await newCompany.save();
            console.log( newCompany );


            // return res.status( 200 ).json( { status: 1, message: "Data added !!!" } );
            const allData = await sipCompanyData.find( { companyId } );
            return res.status( 200 ).json( { status: 1, data: allData } );
        }
        else
        {

            return res.status( 200 ).json( { status: 2, message: 'company already in list !!!' } );
        }

    } catch ( error )
    {
        console.error( error );
        return res.status( 200 ).json( { status: 2, message: error } );

    }

} );


router.post( '/sip-company-data', authTokenVerification, async ( req, res ) =>
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
        return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );



    try
    {

        const allData = await sipCompanyData.find( { companyId } );
        return res.status( 200 ).json( { status: 1, data: allData } );

    } catch ( error )
    {

        console.error( error );
        return res.status( 200 ).json( { status: 2, message: error } );

    }


}
);


router.post( '/sip-one-company-data', authTokenVerification, async ( req, res ) =>
{
    const authUser = req.user;
    const { companyId, sipCompanyId } = req.body;
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

        const oneData = await sipCompanyData.findOne( { companyId, sipCompanyId } );

        if ( oneData )
        {
            console.log( oneData );
            return res.status( 200 ).json( { status: 1, data: oneData } );

        }


        return res.status( 200 ).json( { status: 1, message: "Not found !!!" } );

    } catch ( error )
    {

        console.error( error );
        return res.status( 200 ).json( { status: 2, message: error } );

    }


}
);


router.post(
    '/add-new-product',
    authTokenVerification,
    async ( req, res ) =>
    {

        const authUser = req.user;
        const { companyId, sipCompanyId, productName, renewTime } = req.body;
        const phoneNumberAdmin = authUser.phoneNumber;
        const type = authUser.type;
        const companyIdJ = authUser.companyId;
        if ( type != 'super-admin' ) return res.status( 401 ).send();
        if ( companyId != companyIdJ ) return res.send( 408 );


        const companyData = await sipCompanyData.findOne( { sipCompanyId } );
        if ( !companyData )
        {
            return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );
        }


        const productDetails = sipCompanyData.findOne( { sipCompanyId } );
        if ( !productDetails )
        {
            return res.status( 200 ).json( { status: 2, message: 'Product not found !!!' } );
        }

        try
        {


            const updatedCompanyData = await sipCompanyData.updateOne(
                { companyId, sipCompanyId },
                {
                    $push: {
                        productList: {
                            name: productName,
                            renewTimePM: renewTime,
                        }
                    }
                },
                { new: true }
            );

            console.log( updatedCompanyData );

            const oneProduct = await sipCompanyData.findOne( { companyId, sipCompanyId } );

            if ( oneProduct )
            {
                return res.status( 200 ).json( {

                    inputRes: updatedCompanyData,
                    status: 1,
                    message: 'Product added successfully',
                    data: oneProduct
                } );
            }

        } catch ( error )
        {
            console.error( error );
            return res.status( 200 ).json( { status: 2, error, message: 'Server error !!!' } );
        }




    } );

router.post(
    '/add-sip-amount',
    authTokenVerification,
    async ( req, res ) =>
    {

        const authUser = req.user;
        const {
            dates,
            amount,
            name,
            productId,
            companyId,
            sipCompanyId,
            userId
        } = req.body;
        const phoneNumberAdmin = authUser.phoneNumber;
        const type = authUser.type;
        const companyIdJ = authUser.companyId;
        if ( type != 'super-admin' ) return res.status( 401 ).send();
        if ( companyId != companyIdJ ) return res.send( 408 );

        // Todo: company check
        const companyData = await company.findOne( { companyId } );
        if ( !companyData )
            return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );

        // Todo: sip company check
        console.log( sipCompanyId );
        const sipCompanyDataCheck = await sipCompanyData.findOne( { companyId, sipCompanyId } );
        if ( !sipCompanyDataCheck )
            return res.status( 200 ).json( { status: 2, message: 'SIP Company not found !!!' } );

        // Todo: user check
        const userListData = await userList.findOne( { userId } );
        if ( !userListData )
            return res.status( 200 ).json( { status: 2, message: 'User not found !!!' } );

        // Todo: user onboarding check
        const sipOnboardingData = await sipOnboarding.findOne( { companyId, userId } );
        if ( !sipOnboardingData )
            return res.status( 200 ).json( { status: 2, message: 'user not loaded !!!' } );






        const lastServiceSrlNo = parseInt( companyData.lastServiceSrlNo ) + 1;

        const serviceId = companyId + "-ser-" + lastServiceSrlNo;
        const createDate = new Date().getTime();

        const sipId = short.generate().toString();

        const validNumbers = [];
        for ( let i = 1; i <= 30; i++ )
        {
            validNumbers.push( i );
        }

        const parts = dates.split( ',' );
        const numbers = parts
            .map( part => part.trim() ) // Trim whitespace from each part
            .filter( part => !isNaN( part ) && part !== '' ) // Filter out non-numeric values and empty strings
            .map( Number ) // Convert remaining parts to numbers
            .filter( number => validNumbers.includes( number ) ); // Filter numbers to ensure they are within the valid range

        const productsRenewDates = [ ...new Set( numbers ) ];
        console.log( productsRenewDates );

        // Save all data to userList
        const newSIP = new sipUserData( {
            userId,
            sipId,
            sipCompanyId,

            companyId,
            updateDate: createDate,
            createDate,
            closingAmount: 0,

            productsAmount: amount,
            productsName: name,
            productId,
            productsRenewDates,

            serviceId,
            status: 'active',

            sipCompanyData: sipCompanyDataCheck._id,
            sipOnboardingData: sipOnboardingData._id,


        } );

        await newSIP.save();


        // update company lastUserSrlNo
        const lastUserSrlNoUpdate = await company.updateOne( { companyId }, { lastServiceSrlNo } );

        return res.status( 200 ).json( { status: 1, message: "Data added !!!" } );


    } );


router.post(
    '/user-sip-List',
    authTokenVerification,
    async ( req, res ) =>
    {

        const authUser = req.user;
        const {
            dates,
            amount,
            name,
            productId,
            companyId,
            sipCompanyId,
            userId
        } = req.body;
        const phoneNumberAdmin = authUser.phoneNumber;
        const type = authUser.type;
        const companyIdJ = authUser.companyId;
        if ( type != 'super-admin' ) return res.status( 401 ).send();
        if ( companyId != companyIdJ ) return res.send( 408 );

        // Todo: company check
        const companyData = await company.findOne( { companyId } );
        if ( !companyData )
            return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );

        // Todo: sip company check
        console.log( sipCompanyId );
        const sipCompanyDataCheck = await sipCompanyData.findOne( { companyId, sipCompanyId } );
        if ( !sipCompanyDataCheck )
            return res.status( 200 ).json( { status: 2, message: 'SIP Company not found !!!' } );

        // Todo: user check
        const userListData = await userList.findOne( { userId } );
        if ( !userListData )
            return res.status( 200 ).json( { status: 2, message: 'User not found !!!' } );

        // Todo: user onboarding check
        const sipOnboardingData = await sipOnboarding.findOne( { companyId, userId } );
        if ( !sipOnboardingData )
            return res.status( 200 ).json( { status: 2, message: 'user not loaded !!!' } );






        const lastServiceSrlNo = parseInt( companyData.lastServiceSrlNo ) + 1;

        const serviceId = companyId + "-ser-" + lastServiceSrlNo;
        const createDate = new Date().getTime();

        const sipId = short.generate().toString();






        // Save all data to userList
        const newSIP = new sipUserData( {
            userId,
            sipId,
            sipCompanyId,

            companyId,
            updateDate: createDate,
            createDate,
            closingAmount: 0,

            productsAmount: amount,
            productsName: name,
            productId,
            productsRenewDates,

            serviceId,
            status: 'active',

            sipCompanyData: sipCompanyDataCheck._id,
            sipOnboardingData: sipOnboardingData._id,


        } );

        await newSIP.save();


        // update company lastUserSrlNo
        const lastUserSrlNoUpdate = await company.updateOne( { companyId }, { lastServiceSrlNo } );

        return res.status( 200 ).json( { status: 1, message: "Data added !!!" } );


    } );


router.post(
    '/all-users-sip',
    authTokenVerification,
    async ( req, res ) =>
    {

        const authUser = req.user;
        const {
            companyId,
            // sipId,
            userId
        } = req.body;
        const phoneNumberAdmin = authUser.phoneNumber;
        const type = authUser.type;
        const companyIdJ = authUser.companyId;
        if ( type != 'super-admin' ) return res.status( 401 ).send();
        if ( companyId != companyIdJ ) return res.send( 408 );

        // Todo: company check
        const companyData = await company.findOne( { companyId } );
        if ( !companyData )
            return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );

        // Todo: sip company check
        // const sipCompanyDataCheck = await sipCompanyData.findOne( { companyId, sipCompanyId } );
        // if ( !sipCompanyDataCheck )
        //     return res.status( 200 ).json( { status: 2, message: 'SIP Company not found !!!' } );

        // Todo: user check
        const userListData = await userList.findOne( { userId } );
        if ( !userListData )
            return res.status( 200 ).json( { status: 2, message: 'User not found !!!' } );

        // Todo: user onboarding check
        const sipOnboardingData = await sipOnboarding.findOne( { companyId, userId } );
        if ( !sipOnboardingData )
            return res.status( 200 ).json( { status: 2, message: 'user not loaded !!!' } );


        const sipUserDataAll = await sipUserData.find( { companyId, userId } )
            .populate( {
                path: 'sipOnboardingData',
                populate: {
                    path: 'userFullData',
                    // model: 'company'
                }
            } )
            .populate( {
                path: 'sipCompanyData',
            } );
        if ( !sipUserDataAll )
            return res.status( 200 ).json( { status: 2, message: 'user not loaded !!!' } );

        return res.status( 200 ).json( { status: 1, data: sipUserDataAll } );

    } );

module.exports = router;