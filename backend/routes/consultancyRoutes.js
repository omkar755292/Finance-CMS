const express = require( 'express' );
const router = express.Router();
const company = require( '../models/company' );
const userList = require( '../models/userList' );
const consultancyOnboarding = require( '../models/ConsultancyOnboarding' );
const ConsultancyService = require( '../models/ConsultancyService' );

const authTokenVerification = require( '../middlewares/authMiddleware' );
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
    const path2A = path1 + "/" + companyId;
    const path2B = path2A + "/encrypted-files";
    const path3 = path2B + "/user-kyc";

    // create folder if not exist
    if ( !fs.existsSync( path1 ) )
    {
      fs.mkdirSync( path1 );
    }
    if ( !fs.existsSync( path2A ) )
    {
      fs.mkdirSync( path2A );
    }
    if ( !fs.existsSync( path2B ) )
    {
      fs.mkdirSync( path2B );
    }
    if ( !fs.existsSync( path3 ) )
    {
      fs.mkdirSync( path3 );
    }

    const fileName = short.generate();

    return cb( null, `${ path3 }/${ fileName }${ path.extname( file.originalname ) }` )
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

    const userDataC = await consultancyOnboarding.findOne( { userId, companyId } );
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

    // const lastServiceSrlNo = parseInt( companyData.lastServiceSrlNo ) + 1;

    const createDate = new Date().getTime();


    // Save all data to userList
    const newUser = new consultancyOnboarding( {
      createDate,
      userId,
      userFullData: userData._id,
      companyId,
      updateDate: createDate,

    } );

    await newUser.save();

    return res.status( 200 ).json( { status: 1, message: "Data added !!!" } );

  } );

// GET endpoint to retrieve company data
router.post( '/all-users', authTokenVerification, async ( req, res ) =>
{

  const authUser = req.user;
  const { companyId } = req.body;
  const phoneNumberAdmin = authUser.phoneNumber;
  const type = authUser.type;
  const companyIdJ = authUser.companyId;
  if ( type != 'super-admin' ) return res.status( 401 ).send();
  if ( companyId != companyIdJ ) return res.send( 408 );
  console.log( "111" );



  try
  {
    const allUsers = await consultancyOnboarding
      .find( { companyId } )
      .populate( 'userFullData' );


    if ( allUsers )
      return res.status( 200 ).json( { status: 1, data: allUsers } );

    return res.status( 200 ).json( { status: 2, message: "No data found ..." } );
  } catch ( error )
  {
    console.error( error );
    return res.status( 200 ).json( { status: 2, message: error } );
  }
} );


router.post( '/all-services', authTokenVerification, async ( req, res ) =>
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
    const allServices = await ConsultancyService
      .find( { userId, companyId } )
      .populate( {
        path: 'consultancyOnboardingData',
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
} );




router.post(
  '/reg-new-services',
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




    const { userId, subject, category, subCategory, note, price, paymentType } = req.body;



    const userData = await userList.findOne( { userId, companyId } );
    console.log( userData );
    if ( !userData )
    {
      return res.status( 200 ).json( { status: 2, message: 'user not found !!!' } );
    }

    const userDataC = await consultancyOnboarding.findOne( { userId, companyId } );
    console.log( userDataC );
    if ( !userDataC )
    {
      return res.status( 200 ).json( { status: 2, message: 'user not loaded !!!' } );
    }



    const companyData = await company.findOne( { companyId } );
    if ( !companyData )
    {
      return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );
    }



    const lastServiceSrlNo = parseInt( companyData.lastServiceSrlNo ) + 1;

    const serviceId = companyId + "-ser-" + lastServiceSrlNo;
    const createDate = new Date().getTime();


    // Save all data to userList
    const newUser = new ConsultancyService( {
      userId,
      subject,
      company,
      category,
      subCategory,
      note,
      price,
      paymentType,
      serviceId,
      createDate,
      companyId,
      consultancyOnboardingData: userDataC._id
    } );

    await newUser.save();


    // update company lastUserSrlNo
    const lastUserSrlNoUpdate = await company.updateOne( { companyId }, { lastServiceSrlNo } );

    return res.status( 200 ).json( { status: 1, message: "Data added !!!" } );

  } );



router.post(
  '/add-notes-to-services',
  authTokenVerification,
  async ( req, res ) =>
  {

    const authUser = req.user;
    const { companyId, userId, serviceId, note } = req.body;

    const phoneNumberAdmin = authUser.phoneNumber;
    const type = authUser.type;
    const companyIdJ = authUser.companyId;
    if ( type != 'super-admin' ) return res.status( 401 ).send();
    if ( companyId != companyIdJ ) return res.send( 408 );



    const entryTime = new Date().getTime().toString();

    const userData = await userList.findOne( { userId, companyId } );
    console.log( userData );
    if ( !userData )
    {
      return res.status( 200 ).json( { status: 2, message: 'user not found !!!' } );
    }

    const userDataC = await consultancyOnboarding.findOne( { userId, companyId } );
    console.log( userDataC );
    if ( !userDataC )
    {
      return res.status( 200 ).json( { status: 2, message: 'user not loaded !!!' } );
    }

    const companyData = await company.findOne( { companyId } );
    if ( !companyData )
    {
      return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );
    }



    const serviceDetails = ConsultancyService
      .findOne( { companyId, userId, serviceId } );
    if ( !serviceDetails )
    {
      return res.status( 200 ).json( { status: 2, message: 'Service not found !!!' } );
    }




    const finalData = await ConsultancyService.updateOne(

      {
        companyId, userId, serviceId
      }
      ,
      {
        $push: {
          quotations: {
            note, entryTime
          }
        }
      }
      ,
      { new: true }
    );



    const oneUser = await ConsultancyService
      .findOne( { companyId, userId, serviceId } )
      .populate( {
        path: 'consultancyOnboardingData',
        populate: {
          path: 'userFullData',
          // model: 'company'
        }
      } );

    if ( oneUser )
      return res.status( 200 ).json( {
        inputRes: finalData,
        status: 1,
        message: 'Notes added successfully',
        data: oneUser
      } );


    return res.status( 200 ).json( { status: 2, message: "No user found" } );




  } );



router.post( '/one-service', authTokenVerification, async ( req, res ) =>
{

  const authUser = req.user;
  const { companyId, userId, serviceId } = req.body;
  console.log( companyId );
  const phoneNumberAdmin = authUser.phoneNumber;
  const type = authUser.type;
  const companyIdJ = authUser.companyId;
  if ( type != 'super-admin' ) return res.status( 401 ).send();
  if ( companyId != companyIdJ ) return res.send( 408 );



  console.log( companyId, userId )
  try
  {
    const oneUser = await ConsultancyService
      .findOne( { companyId, userId, serviceId } )
      .populate( {
        path: 'consultancyOnboardingData',
        populate: {
          path: 'userFullData',
          // model: 'user-list'
        }
      } );

    if ( oneUser )
      return res.status( 200 ).json( { status: 1, data: oneUser } );


    return res.status( 200 ).json( { status: 2, message: "No user found" } );
  } catch ( error )
  {
    res.status( 200 ).json( { status: 1, message: "Server error" } );
  }
} );

module.exports = router;
