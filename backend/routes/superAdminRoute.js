// routes/authRoutes.js
const express = require( 'express' );
const { adminRegister, adminLogin } = require( '../controllers/adminAuthController' );

const router = express.Router();

router.post( '/admin/register', adminRegister );
router.post( '/admin/login', adminLogin );

module.exports = router;
