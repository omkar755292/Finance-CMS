// routes/authRoutes.js
const express = require( 'express' );
const { adminRegister, adminLogin } = require( '../controllers/adminAuthController' );
const authenticateToken = require( '../middlewares/authMiddleware' );

const router = express.Router();

router.post( '/admin/register', adminRegister );
router.post( '/admin/login', adminLogin );



// router.get('/auth/profile', authenticateToken, (req, res) => {
//     res.json(req.user);
// });

module.exports = router;
