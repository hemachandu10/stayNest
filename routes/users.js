const express=require('express');
const router=express.Router();
const User=require("../models/user");
const wrapAsync = require('../utils/wrapAsyc');
const passport=require("passport");
const usersController=require("../controllers/users");

router.get("/signup",usersController.renderSignupForm)
router.post("/signup",wrapAsync(usersController.signup));

router.get("/login",usersController.renderLoginForm);
router.post("/login",
    passport.authenticate("local",{
    failureFlash:true,
    failureRedirect:"/users/login"
    }),
    usersController.login);

router.get("/logout",usersController.logout);

module.exports=router;