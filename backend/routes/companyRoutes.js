const express = require( 'express' );
const router = express.Router();
const Company = require( '../models/company' );
const authTokenVerification = require( '../middlewares/authMiddleware' );
const admin = require( '../models/admin' );
const adminList = require( '../models/adminList' );


// POST endpoint to add new company
// router.post( '/add-new', authTokenVerification, async ( req, res ) =>
router.post( '/add-new', async ( req, res ) =>
{
  const { companyName, companyId, adminMail, name, email, phoneNumber, whatsappNumber, password } = req.body;

  if ( !companyName || !companyId || !adminMail )
  {
    return res.status( 200 ).json( { status: 2, message: 'Missing required fields' } );
  }

  const user = await Company.findOne( { companyId } );

  if ( user )
  {
    return res.status( 200 ).json( { status: 2, message: 'Company ID already uses !!!' } );
  }

  const createDate = new Date().getTime();

  const newCompany = new Company( {
    companyName,
    companyId,
    createDate,
    adminMail,
  } );

  // try
  // {
  const savedCompany = await newCompany.save();

  const userId = companyId + "-reg-1";


  // Save all data to adminList
  const newUser = new adminList( {
    userId,
    name,
    email,
    phoneNumber,
    whatsappNumber,
    position: "super-admin",
    companyId,
    createDate,
    updateDate: createDate,

    companyFullData: savedCompany._id

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



  res.status( 200 ).json( { status: 1, message: "Successful..." } );
  // } catch ( error )
  // {

  //   res.status( 500 ).json( { message: error } );
  // }
} );

// GET endpoint to retrieve company data
router.get( '/allData', authTokenVerification, async ( req, res ) =>
{
  try
  {
    const companies = await Company.find( {} );
    res.status( 200 ).json( { status: 1, data: companies } );
  } catch ( error )
  {
    res.status( 500 ).json( { message: error } );
  }
} );

module.exports = router;
