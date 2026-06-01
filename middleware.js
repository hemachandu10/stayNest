const Listing=require("./models/listing")
const { listingSchema} = require("./schema");
const ExpressError=require("./utils/ExpressErrors");
const { ReviewSchema } = require("./schema");
const Review=require("./models/review");

module.exports.isLoggedIn=(req,res,next)=>{
    if (!req.isAuthenticated()) {
        req.flash("error","You must be signed in to do that") //flash is used to show an error message if the user is not authenticated
        return res.redirect("/users/login")
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
    let id=req.params.id;
    let listing=await Listing.findById({_id:id})
    if (req.user && !listing.owner.equals(req.user._id)) { // Check if the current user is the owner of the listing
        req.flash("error","You are not the owner of this listing") //flash is used to show an error message if the user is not the owner of the listing
        return res.redirect(`/listings/${id}`)
    }
    next();
}    

module.exports.validateListing=(req,res,next)=>{
    let result=listingSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400,result.error.details[0].message)
    }
    else{
        next();
    }
}

module.exports.validateReview=(req,res,next)=>{
    let result=ReviewSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400,result.error.details[0].message)
    }
    else{
        next();
    }
}

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById({_id:reviewId})
    if (req.user && !review.author.equals(req.user._id)) { // Check if the current user is the author of the review
        req.flash("error","You are not the author of this review") //flash is used to show an error message if the user is not the author of the review
        return res.redirect(`/listings/${id}`)
    }
    next();
}

