const express = require( 'express' );
const authTokenVerification = require( '../middlewares/authMiddleware' );
const userList = require( '../models/userList' );
const gstOnboardingModel = require( '../models/gstOnboarding' );
const company = require( '../models/company' );
const gstQuestionPack = require( '../models/gstQuestionPack' );
const gstUserRegForm = require( '../models/gstUserRegForm' );
const router = express.Router();
const short = require( 'short-uuid' );


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

        const userDataC = await gstOnboardingModel.findOne( { companyId, userId } );
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

        const newUser = new gstOnboardingModel( {
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

            const companyData = await company.findOne( { companyId } );
            if ( !companyData )
            {
                return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );
            }

            const allUsers = await gstOnboardingModel.find( { companyId } ).populate( 'userFullData' );

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


router.post( '/new-gst-form-reg', authTokenVerification, async ( req, res ) =>
{

    const authUser = req.user;
    const phoneNumberAdmin = authUser.phoneNumber;
    const { companyId, formName } = req.body;
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


        const createDate = new Date().getTime();
        const questionId = short.generate().toString();

        const newForm = new gstQuestionPack( {
            createDate,
            formName,
            openDate: createDate,
            updateDate: createDate,
            companyId,
            questionId,
        } );

        await newForm.save();
        console.log( newForm );
        return res.status( 200 ).json( { status: 1, message: "Data added !!!" } );

    } catch ( error )
    {
        console.error( error );
        return res.status( 200 ).json( { status: 2, message: error } );

    }

} );


router.post( '/gst-reg-form-list', authTokenVerification, async ( req, res ) =>
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

        const formData = await gstQuestionPack.find( { companyId } );

        if ( formData.length == 0 ) return res.status( 200 ).json( { status: 2, message: "No data found ..." } );

        return res.status( 200 ).json( { status: 1, data: formData } );

    } catch ( error )
    {
        console.error( error );
        return res.status( 200 ).json( { status: 2, message: error } );
    }

} );


router.post( '/gst-reg-form-one', authTokenVerification, async ( req, res ) =>
{
    const authUser = req.user;
    const { companyId, questionId } = req.body;
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
        console.log( companyId, questionId );

        const formData = await gstQuestionPack.findOne( { companyId, questionId } );
        console.log( formData );
        if ( !formData ) return res.status( 200 ).json( { status: 2, message: "No data found ..." } );


        return res.status( 200 ).json( { status: 1, data: formData } );

    } catch ( error )
    {
        console.error( error );
        return res.status( 200 ).json( { status: 2, message: error } );
    }

} );


router.post(
    '/add-new-question',
    authTokenVerification,
    async ( req, res ) =>
    {

        const authUser = req.user;
        const { companyId, questionId, question, questionType } = req.body;
        const phoneNumberAdmin = authUser.phoneNumber;
        const type = authUser.type;
        const companyIdJ = authUser.companyId;
        if ( type != 'super-admin' ) return res.status( 401 ).send();
        if ( companyId != companyIdJ ) return res.send( 408 );


        console.log( questionId );
        console.log( question );
        console.log( questionType );
        console.log( companyId );


        const companyData = await gstOnboardingModel.findOne( { companyId } );
        if ( !companyData )
        {
            return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );
        }


        const questionDetails = await gstQuestionPack.findOne( { questionId, companyId } );
        if ( !questionDetails )
        {
            return res.status( 200 ).json( { status: 2, message: 'Questions not found !!!' } );
        }

        try
        {


            const updatedQuestionList = await gstQuestionPack.updateOne(
                { companyId, questionId },
                {
                    $push: {
                        questions: {
                            questionType: questionType,
                            question: question,
                        }
                    }
                },
                { new: true }
            );

            console.log( updatedQuestionList );

            const oneUser = await gstQuestionPack.findOne( { companyId, questionId } );

            if ( oneUser )
            {
                return res.status( 200 ).json( {

                    inputRes: updatedQuestionList,
                    status: 1,
                    message: 'Question added successfully',
                    data: oneUser
                } );
            }

        } catch ( error )
        {
            console.error( error );
            return res.status( 200 ).json( { status: 2, error, message: 'Server error !!!' } );
        }


    } );




router.post( '/user-question-create', authTokenVerification, async ( req, res ) =>
{

    const authUser = req.user;
    const phoneNumberAdmin = authUser.phoneNumber;
    const { companyId, questionId, userId, question } = req.body;
    const type = authUser.type;
    const companyIdJ = authUser.companyId;
    if ( type != 'super-admin' ) return res.status( 401 ).send();
    if ( companyId != companyIdJ ) return res.status( 408 );


    const companyData = await company.findOne( { companyId } );
    if ( !companyData )
    {
        return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );
    }

    console.log( companyId, questionId, userId, question );
    const questionDetails = await gstQuestionPack.findOne( { _id: questionId, companyId } );
    console.log( questionDetails );

    if ( !questionDetails )
    {
        return res.status( 200 ).json( { status: 2, message: 'Questions not found !!!' } );
    }

    const userDataC = await gstOnboardingModel.findOne( { companyId, userId } );
    console.log( userDataC );
    if ( !userDataC )
    {
        return res.status( 200 ).json( { status: 2, message: 'user not loaded !!!' } );
    }

    try
    {

        const createDate = new Date().getTime();
        const formId = short.generate().toString();
        const formPassword = short.generate().toString();

        const lastServiceSrlNo = parseInt( companyData.lastServiceSrlNo ) + 1;

        const serviceId = companyId + "-ser-" + lastServiceSrlNo;

        const questionPackData = questionDetails._id;
        console.log( questionPackData );
        const userOnboardingData = userDataC._id;
        const formName = question;

        const newForm = new gstUserRegForm( {
            userId,
            createDate,
            formId,
            formPassword,
            serviceId,
            questionPackData,
            userOnboardingData,
            formName,
            updateDate: createDate,
            companyId,
        } );

        await newForm.save();

        // update company lastUserSrlNo
        const lastUserSrlNoUpdate = await company.updateOne( { companyId }, { lastServiceSrlNo } );

        const formList = await gstUserRegForm
            .find( { companyId, userId } )
            .populate( {
                path: 'userOnboardingData',
                populate: {
                    path: 'userFullData',
                    // model: 'company'
                }
            } )
            .populate( {
                path: 'questionPackData',
            } );

        if ( !formList ) return res.status( 200 ).json( { status: 2, message: "No data found ..." } );

        return res.status( 200 ).json( { status: 1, data: formList, message: "Data added !!!" } );

    } catch ( error )
    {
        console.error( error );
        return res.status( 200 ).json( { status: 2, message: error } );

    }

} );


router.post( '/user-question-list', authTokenVerification, async ( req, res ) =>
{

    const authUser = req.user;
    const phoneNumberAdmin = authUser.phoneNumber;
    const { companyId, userId } = req.body;
    const type = authUser.type;
    const companyIdJ = authUser.companyId;
    if ( type != 'super-admin' ) return res.status( 401 ).send();
    if ( companyId != companyIdJ ) return res.status( 408 );

    const companyData = await company.findOne( { companyId } );
    if ( !companyData )
    {
        return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );
    }

    const userDataC = await gstOnboardingModel.findOne( { companyId, userId } );
    console.log( userDataC );
    if ( !userDataC )
    {
        return res.status( 200 ).json( { status: 2, message: 'user not loaded !!!' } );
    }

    try
    {

        const formList = await gstUserRegForm
            .find( { companyId, userId } )
            .populate( {
                path: 'userOnboardingData',
                populate: {
                    path: 'userFullData',
                    // model: 'company'
                }
            } )
            .populate( {
                path: 'questionPackData',
            } );

        if ( !formList ) return res.status( 200 ).json( { status: 2, message: "No data found ..." } );

        return res.status( 200 ).json( { status: 1, data: formList } );

    } catch ( error )
    {
        console.error( error );
        return res.status( 200 ).json( { status: 2, message: error } );
    }

} );




// Todo: new user-question-one-public
router.post( '/user-question-one-public', async ( req, res ) =>
{

    const { formId, formPassword, serviceId } = req.body;

    try
    {

        const formList = await gstUserRegForm
            .findOne( { formId, formPassword, serviceId } )
            .populate( {
                path: 'userOnboardingData',
                populate: {
                    path: 'userFullData',
                    // model: 'company'
                }
            } )
            .populate( {
                path: 'questionPackData',
            } );

        if ( !formList ) return res.status( 200 ).json( { status: 2, message: "No data found ..." } );

        return res.status( 200 ).json( { status: 1, data: formList } );

    } catch ( error )
    {
        console.error( error );
        return res.status( 200 ).json( { status: 2, message: error } );
    }

} );


module.exports = router;