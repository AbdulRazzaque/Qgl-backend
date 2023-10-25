// import express from 'express'
// import registerSchema from '../controllers/Auth/registerController.js'
// import LoginSchema from '../controllers/Auth/loginController.js'
// import userController from '../controllers/Auth/userController.js'
// import auth from '../middlewares/auth.js'
// import QglController from '../controllers/Auth/QglController.js'
// import RprenewalformController from '../controllers/Forms/RprenewalformController'
// import RprenewalformController from '../controllers/Forms/RprenewalformController'
const express = require('express');
const registerSchema = require('../controllers/Auth/registerController.js');
const LoginSchema = require('../controllers/Auth/loginController.js');
const userController = require('../controllers/Auth/userController.js');
const auth = require('../middlewares/auth.js');
const QglController = require('../controllers/Auth/QglController.js');



const Route = express.Router()
//-------------------Auth Routh-----------------------------------------
Route.post('/register',registerSchema.register)
Route.post('/login',LoginSchema.login)
Route.get('/me',  auth, userController.me)


//=========================RP Renewal Form======================================
// Route.get('/allRprenewalform/',RprenewalformController.Rprenewalform)
// Route.get('/oneRprenewalform/:id',RprenewalformController.oneRprenewalform)
// Route.post('/Rprenewalform', auth,RprenewalformController.Rprenewalform)
// Route.put('/UpdateRprenewalform/:id', auth,RprenewalformController.UpdateRprenewalform)
// Route.delete('/deleteUpdateRprenewalform/:id', auth,RprenewalformController.deleteUpdateRprenewalform)
// //=====================================================================================
Route.post('/qgl/',QglController.receipt)
Route.put('/updatereceipt/:id',QglController.updatereceipt)
Route.get('/getreceipt/',QglController.getreceipt)
Route.delete('/deletereceipt/:id',QglController.deletereceipt)
// Route.get('/oneRprenewalform/:id',RprenewalformController.oneRprenewalform)
// Route.post('/Rprenewalform', auth,RprenewalformController.Rprenewalform)
// Route.put('/UpdateRprenewalform/:id', auth,RprenewalformController.UpdateRprenewalform)
// Route.delete('/deleteUpdateRprenewalform/:id', auth,RprenewalformController.deleteUpdateRprenewalform)
// //=====================================================================================



// export default Route
module.exports = Route;
