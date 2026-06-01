const User=require("../models/user")

module.exports.renderSignupForm= async(req,res)=>{
     res.render("users/signup.ejs");
}

module.exports.renderLoginForm= async(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.signup=async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        const user=new User({username,email});
        const registeredUser=await User.register(user,password);
        req.login(registeredUser,function(err){ //login is a method provided by passport to log in the user after registration
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to stayNest");
            res.redirect("/listings");
        })   
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/users/signup");
    }
}

module.exports.login=async (req,res)=>{
    req.flash("success","Welcome back to stayNest");
    res.redirect("/listings");
}

module.exports.logout=(req,res)=>{
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        req.flash("success","You have been logged out!");
        res.redirect("/listings");
    });
}