const express = require( 'express' );
const router = express.Router();
const company = require( '../models/company' );
const admin = require( '../models/admin' );
const adminList = require( '../models/adminList' );

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
  '/new-kyc',
  authTokenVerification,
  // upload.fields( [ { name: 'aadhaarPdf', maxCount: 1 }, { name: 'panPdf', maxCount: 1 }, { name: 'profileImage', maxCount: 1 } ] ),
  async ( req, res ) =>
  {

    const authUser = req.user;
    const { companyId } = req.body;
    const phoneNumberAdmin = authUser.phoneNumber;
    const type = authUser.type;
    const companyIdJ = authUser.companyId;
    if ( type != 'super-admin' ) return res.status( 401 ).send();
    console.log( req.body );
    console.log( companyId, companyIdJ );
    if ( companyId != companyIdJ ) return res.send( 408 );




    const { name, email, phoneNumber, whatsappNumber, password } = req.body;
    // const { name, email, phoneNumber, whatsappNumber, address, pinCode, city, state, panNumber, aadhaarNumber, fatherName, motherName, occupation } = req.body;



    // const aadhaarPdf = req.files[ 'aadhaarPdf' ][ 0 ].filename;
    // const panPdf = req.files[ 'panPdf' ][ 0 ].filename;
    // const profileImage = req.files[ 'profileImage' ][ 0 ].filename;


    const companyData = await company.findOne( { companyId } );

    if ( !companyData )
    {
      return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );
    }

    const lastUserSrlNo = parseInt( companyData.lastUserSrlNo ) + 1;

    const userId = companyId + "-reg-" + lastUserSrlNo;
    const createDate = new Date().getTime();


    // Save all data to adminList
    const newUser = new adminList( {
      userId,
      name,
      email,
      phoneNumber,
      whatsappNumber,
      // address,
      // pinCode,
      // city,
      // state,
      // panNumber,
      // aadhaarNumber,
      // fatherName,
      // motherName,
      // occupation,
      // aadhaarPdf,
      // panPdf,
      // profileImage,
      companyId,
      createDate,
      updateDate: createDate,

      companyFullData: companyData._id

    } );


    const getData = await newUser.save();

    console.log( getData );

    // Save all data to adminList
    const newUserAdmin = new admin( {
      userId,
      name,
      email,
      password,
      createDate,
      updateDate: createDate,
      adminFullData: getData._id
    } );

    const getNewUserAdminData = await newUserAdmin.save();










    // update company lastUserSrlNo
    const lastUserSrlNoUpdate = await company.updateOne( { companyId }, { lastUserSrlNo } );

    return res.status( 200 ).json( { status: 1, message: "Data added !!!" } );

  } );



router.post(
  '/update-kyc',
  authTokenVerification,
  upload.fields( [ { name: 'aadhaarPdf', maxCount: 1 }, { name: 'panPdf', maxCount: 1 }, { name: 'profileImage', maxCount: 1 } ] ),
  async ( req, res ) =>
  {

    const authUser = req.user;
    const { companyId } = req.body;
    console.log( companyId );
    console.log( req.body );
    console.log( req.user );
    const phoneNumberAdmin = authUser.phoneNumber;
    const type = authUser.type;
    const companyIdJ = authUser.companyId;
    if ( type != 'super-admin' ) return res.status( 401 ).send();
    if ( companyId != companyIdJ ) return res.send( 408 );




    const { userId, name, email, phoneNumber, whatsappNumber, address, pinCode, city, state, panNumber, aadhaarNumber, fatherName, motherName, occupation } = req.body;


    // const aadhaarPdf = req.files[ 'aadhaarPdf' ] ? req.files[ 'aadhaarPdf' ][ 0 ].filename : null;
    // const panPdf = req.files[ 'panPdf' ] ? req.files[ 'aadhaarPdf' ][ 0 ].filename : null;
    // const profileImage = req.files[ 'profileImage' ] ? req.files[ 'aadhaarPdf' ][ 0 ].filename : null;


    // const { aadhaarPdf, panPdf, profileImage } = req.files;
    // const aadhaarPdf = req.files[ 'aadhaarPdf' ][ 0 ].filename;
    // const panPdf = req.files[ 'panPdf' ][ 0 ].filename;
    // const profileImage = req.files[ 'profileImage' ][ 0 ].filename;


    const companyData = await company.findOne( { companyId } );
    console.log( companyData );
    if ( !companyData )
    {
      return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );
    }

    // const lastUserSrlNo = parseInt( companyData.lastUserSrlNo ) + 1;

    // const userId = companyId + "-reg-" + lastUserSrlNo;
    const updateDate = new Date().getTime();


    await adminList.updateOne(
      { userId, companyId },
      {
        name,
        email,
        phoneNumber,
        whatsappNumber,
        // address,
        // pinCode,
        // city,
        // state,
        // panNumber,
        // aadhaarNumber,
        // fatherName,
        // motherName,
        // occupation,
        // aadhaarPdf,
        // panPdf,
        // profileImage,
        // companyId,
        updateDate
      }
    );



    // aadhaarPdf
    //   ? await adminList.updateOne(
    //     { userId, companyId },
    //     {
    //       aadhaarPdf
    //     }
    //   )
    //   : null;

    // panPdf
    //   ? await adminList.updateOne(
    //     { userId, companyId },
    //     {
    //       panPdf
    //     }
    //   )
    //   : null;

    // profileImage
    //   ? await adminList.updateOne(
    //     { userId, companyId },
    //     {
    //       profileImage,
    //     }
    //   )
    //   : null;

    return res.status( 200 ).json( { status: 1, message: "Data update !!!" } );

  } );



router.post(
  '/update-roll',
  authTokenVerification,
  async ( req, res ) =>
  {

    const authUser = req.user;
    const { companyId } = req.body;
    console.log( companyId );
    console.log( req.body );
    console.log( req.user );
    const phoneNumberAdmin = authUser.phoneNumber;
    const type = authUser.type;
    const companyIdJ = authUser.companyId;
    if ( type != 'super-admin' ) return res.status( 401 ).send();
    if ( companyId != companyIdJ ) return res.send( 408 );

    const { userId, userDataRoll, adminDataRoll, sipServiceRoll, gstServiceRoll, incomeServiceRoll, insuranceServiceRoll, consultancyServiceRoll } = req.body;



    const companyData = await company.findOne( { companyId } );
    console.log( companyData );
    if ( !companyData )
    {
      return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );
    }


    const updateDate = new Date().getTime();


    await adminList.updateOne(
      { userId, companyId },
      {
        userDataRoll,
        adminDataRoll,
        sipServiceRoll,
        gstServiceRoll,
        incomeServiceRoll,
        insuranceServiceRoll,
        consultancyServiceRoll,
        updateDate
      }
    );

    return res.status( 200 ).json( { status: 1, message: "Data update !!!" } );

  } );

// GET endpoint to retrieve company data
router.post( '/all-data', authTokenVerification, async ( req, res ) =>
{

  const authUser = req.user;
  const { companyId } = req.body;
  console.log( companyId );
  const phoneNumberAdmin = authUser.phoneNumber;
  const type = authUser.type;
  const companyIdJ = authUser.companyId;
  if ( type != 'super-admin' ) return res.status( 401 ).send();
  if ( companyId != companyIdJ ) return res.send( 408 );


  try
  {
    const allUsers = await adminList
      .find( { companyId } )
    // .populate( 'companyFullData' );

    res.status( 200 ).json( { status: 1, data: allUsers } );
  } catch ( error )
  {
    res.status( 200 ).json( { status: 1, message: error } );
  }
} );

router.post( '/one-data', authTokenVerification, async ( req, res ) =>
{

  const authUser = req.user;
  const { companyId, userId } = req.body;
  console.log( companyId );
  const phoneNumberAdmin = authUser.phoneNumber;
  const type = authUser.type;
  const companyIdJ = authUser.companyId;
  if ( type != 'super-admin' ) return res.status( 401 ).send();
  if ( companyId != companyIdJ ) return res.send( 408 );

  console.log( companyId, userId )
  try
  {
    const oneUser = await adminList.findOne( { companyId, userId } );

    if ( oneUser )
      return res.status( 200 ).json( { status: 1, data: oneUser } );


    return res.status( 200 ).json( { status: 2, message: "No user found" } );
  } catch ( error )
  {
    res.status( 200 ).json( { status: 1, message: "Server error" } );
  }
} );

module.exports = router;
