
const express = require('express');
const registerSchema = require('../controllers/Auth/registerController.js');
const LoginSchema = require('../controllers/Auth/loginController.js');
const userController = require('../controllers/Auth/userController.js');
const Membershipcontroller = require('../controllers/Auth/MembershipConroller.js')
const auth = require('../middlewares/auth.js');
const QglController = require('../controllers/Auth/QglController.js');

const Route = express.Router()
//-------------------Auth Routh-----------------------------------------
Route.post('/register',registerSchema.register)
Route.post('/login',LoginSchema.login)
Route.get('/me',  auth, userController.me)

// //=====================================================================================
Route.post('/qgl/',QglController.receipt)
Route.post('/monthlyreportQGl',QglController.monthlyreportQGl)
Route.put('/updatereceipt/:id',QglController.updatereceipt)
Route.get('/getreceipt/',QglController.getreceipt) 
Route.delete('/deletereceipt/:id',QglController.deletereceipt)
Route.delete('/deletereceipts/:id',QglController.deletereceipts)
// =========================Member Ship Api======================================
Route.post('/addmembership/',Membershipcontroller.addmembership)
Route.post('/addmemberships/',Membershipcontroller.addmemberships)
Route.get('/getmembers/',Membershipcontroller.getmembers)
Route.get('/autocompleteMembers/',Membershipcontroller.autocompleteMembers)
Route.put('/updatamembers/:id',Membershipcontroller.updatamembers)
Route.delete('/deletemembers/:id',Membershipcontroller.deletemembers)

module.exports = Route;
