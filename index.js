require("dotenv").config();//for .env file
const listingsRouter=require("./routes/listing");
const reviewsRouter=require("./routes/reviews");
const userRouter=require("./routes/users");
const ExpressError=require("./utils/ExpressErrors");

const express=require('express');
const app=express()
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}))

const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user");

var methodOverride = require('method-override')
app.use(methodOverride('_method'))

const engine = require('ejs-mate')
app.engine('ejs', engine);
// ejs mate is just like includes. go to npm ejs mates website for more

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));


//using session
const session = require('express-session');
const {MongoStore} = require('connect-mongo');
console.log(MongoStore);
const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    crypto: {
        secret: process.env.SESSION_SECRETE
    },
    touchAfter: 24 * 3600 // time period in seconds after which the session will be updated in the database. Here it is set to 1 day
});
store.on("error", function(e) {
    console.log("SESSION STORE ERROR", e)
});
app.use(session({
    store: store,
    secret: process.env.SESSION_SECRETE,
    resave: false,               // Don't save session if unmodified
    saveUninitialized: true,    // Don't create session until something stored
    cookie:{
        expires: Date.now() + 1000 * 60 * 60 * 24, // 1 day
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true, // Mitigate XSS attacks by preventing client-side script access to the cookie
    }
}));

//database connection
const mongoose = require('mongoose');
const mongo_url=process.env.MONGO_URL;
//const local_url="mongodb://127.0.0.1:27017/stayNest";
async function main() {
    await mongoose.connect(mongo_url);
    //await mongoose.connect(local_url);

  // use `await mongoose.connect('mongodb://127.0.0.1:27017/test');` 
}
main().catch(err => console.log(err));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//flash messages works with session so it should be after session
var flash = require('connect-flash');
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currentUser=req.user; //currentUser is used to check if the user is logged in or not in the navbar
    next();
})

//root route
// app.get('/',(req,res)=>{
//     res.render("start.ejs");
// })
//listing routes
app.use("/listings",listingsRouter)
//review routes
app.use("/listings/:id/reviews",reviewsRouter)
app.use("/users",userRouter)

//error handling
app.use((req,res,next)=>{
    next(new ExpressError(404,"page not found"))
})
app.use((err, req, res, next) => {
   let { statusCode = 500, message = "Something went wrong!" } = err;
   //console.log(err);
    res.status(statusCode).render("error.ejs",{err})
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server is running ... at localhost:${PORT}/listings `);
});
