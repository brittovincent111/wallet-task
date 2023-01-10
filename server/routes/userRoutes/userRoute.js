let  express = require('express');
const { userRegistration, findUser, userPayment, userLogin, userDetails } = require('../../controller/userController/userController');
// const verifyJwtUser = require('../verify/userVerify');
const router = express.Router()

router.post('/userRegistration' , userRegistration )
router.post('/login' , userLogin)
router.get('/user-details/:id' , userDetails )
router.get('/find-user/:val' , findUser )
router.patch('/user-payment' , userPayment )




module.exports = router ;
