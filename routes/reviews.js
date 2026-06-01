const express=require('express');
const router=express.Router({mergeParams:true}); //mergeParams is used to get the params from the parent route
const wrapAsync=require("../utils/wrapAsyc");
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware");
const reviewsController=require("../controllers/reviews")

//review routes
router.post("/",isLoggedIn,validateReview, wrapAsync(reviewsController.saveCreateReview));

//delete review routes 
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewsController.destroyReview));

module.exports=router;

