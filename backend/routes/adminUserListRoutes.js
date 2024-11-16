const express = require( 'express' );
const router = express.Router();
const company = require( '../models/company' );
const userList = require( '../models/userList' );

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
    const path2 = path1 + "/temp";
    const path3 = path2 + "/" + companyId;
    const path4 = path3 + "/encrypted-files";
    const path5 = path4 + "/user-kyc";

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
  '/new-kyc',
  authTokenVerification,
  upload.fields( [ { name: 'aadhaarPdf', maxCount: 1 }, { name: 'panPdf', maxCount: 1 }, { name: 'profileImage', maxCount: 1 } ] ),
  async ( req, res ) =>
  {

    const authUser = req.user;
    const { companyId } = req.body;
    const phoneNumberAdmin = authUser.phoneNumber;
    const type = authUser.type;
    const companyIdJ = authUser.companyId;
    if ( type != 'super-admin' ) return res.status( 401 ).send();
    if ( companyId != companyIdJ ) return res.send( 408 );




    const { name, email, phoneNumber, whatsappNumber, address, pinCode, city, state, panNumber, aadhaarNumber, fatherName, motherName, occupation } = req.body;
    console.log( name, email, phoneNumber, whatsappNumber, address, pinCode, city, state, panNumber, aadhaarNumber, fatherName, motherName, occupation );



    const aadhaarPdfT = req.files[ 'aadhaarPdf' ][ 0 ].filename;
    const panPdfT = req.files[ 'panPdf' ][ 0 ].filename;
    const profileImageT = req.files[ 'profileImage' ][ 0 ].filename;
    console.log( aadhaarPdfT, profileImageT, panPdfT );
    console.log( req.files );


    const path1 = "./uploads";
    const path2 = path1 + "/confidential";
    const path3 = path2 + "/" + companyId;
    const path4 = path3 + "/encrypted-files";
    const path5 = path4 + "/user-kyc";

    const companyData = await company.findOne( { companyId } );
    console.log( companyData );
    if ( !companyData )
    {
      return res.status( 200 ).json( { status: 2, message: 'Company not found !!!' } );
    }

    const lastUserSrlNo = parseInt( companyData.lastUserSrlNo ) + 1;

    const userId = companyId + "-reg-" + lastUserSrlNo;
    const createDate = new Date().getTime();


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

    console.log( aadhaarPdfT );

    var aadhaarPdf = `${ path5 }/${ userId }_aadhaar${ path.extname( aadhaarPdfT ) }`;
    var panPdf = `${ path5 }/${ userId }_pan${ path.extname( panPdfT ) }`;
    var profileImage = `${ path5 }/_profile${ userId }${ path.extname( profileImageT ) }`;

    fs.rename( aadhaarPdfT, aadhaarPdf, function ( err )
    {
      if ( err )
      {
        aadhaarPdf = aadhaarPdfT;
      }
    } );

    fs.rename( panPdfT, panPdf, function ( err )
    {
      if ( err )
      {
        panPdf = panPdfT;
      }
    } );

    fs.rename( profileImageT, profileImage, function ( err )
    {
      if ( err )
      {
        profileImage = profileImageT;
      }
    } );




    // Save all data to userList
    const newUser = new userList( {
      userId,
      name,
      email,
      phoneNumber,
      whatsappNumber,
      address,
      pinCode,
      city,
      state,
      panNumber,
      aadhaarNumber,
      fatherName,
      motherName,
      occupation,
      aadhaarPdf,
      panPdf,
      profileImage,
      companyId,
      createDate,
      updateDate: createDate
    } );

    await newUser.save();


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
    // if ( companyId != companyIdJ ) return res.send( 408 );




    const { userId, name, email, phoneNumber, whatsappNumber, address, pinCode, city, state, panNumber, aadhaarNumber, fatherName, motherName, occupation } = req.body;


    const aadhaarPdf = req.files[ 'aadhaarPdf' ] ? req.files[ 'aadhaarPdf' ][ 0 ].filename : null;
    const panPdf = req.files[ 'panPdf' ] ? req.files[ 'aadhaarPdf' ][ 0 ].filename : null;
    const profileImage = req.files[ 'profileImage' ] ? req.files[ 'aadhaarPdf' ][ 0 ].filename : null;


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


    // update company lastUserSrlNo
    const lastUserSrlNoUpdate = await userList.updateOne(
      { userId, companyId },
      {
        name,
        email,
        phoneNumber,
        whatsappNumber,
        address,
        pinCode,
        city,
        state,
        panNumber,
        aadhaarNumber,
        fatherName,
        motherName,
        occupation,
        // aadhaarPdf,
        // panPdf,
        // profileImage,
        // companyId,
        updateDate
      }
    );



    aadhaarPdf
      ? await userList.updateOne(
        { userId, companyId },
        {
          aadhaarPdf
        }
      )
      : null;

    panPdf
      ? await userList.updateOne(
        { userId, companyId },
        {
          panPdf
        }
      )
      : null;

    profileImage
      ? await userList.updateOne(
        { userId, companyId },
        {
          profileImage,
        }
      )
      : null;

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
    const allUsers = await userList.find( { companyId } );
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
    const oneUser = await userList.findOne( { companyId, userId } );

    if ( oneUser )
      return res.status( 200 ).json( { status: 1, data: oneUser } );


    return res.status( 200 ).json( { status: 2, message: "No user found" } );
  } catch ( error )
  {
    res.status( 200 ).json( { status: 1, message: "Server error" } );
  }
} );

module.exports = router;
