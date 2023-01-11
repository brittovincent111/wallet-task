let  express = require('express');
const { userRegistration, findUser, userPayment, userLogin, userDetails, userDeposit,  } = require('../../controller/userController/userController');
const verifyJwtUser = require('../../verification/userVerify');
// const verifyJwtUser = require('../verify/userVerify');
const router = express.Router()

router.post('/userRegistration' , userRegistration )
router.post('/login' , userLogin)
router.get('/user-details/:id' ,verifyJwtUser, userDetails )
router.get('/find-user/:val' ,verifyJwtUser, findUser )
router.patch('/user-payment' ,verifyJwtUser, userPayment )
router.patch('/user-deposit' ,verifyJwtUser, userDeposit )





module.exports = router ;
