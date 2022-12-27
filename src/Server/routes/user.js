const express = require("express");
const router = express.Router();
const UserController=require('../Controllers/userController')
const User=require('../models/User')

router.route('/login')
.post(UserController.loginUser);


router.route('/register')
.post(UserController.RegisterUser);


router.route('/users')
.get(UserController.getAllUsers)
module.exports=router;