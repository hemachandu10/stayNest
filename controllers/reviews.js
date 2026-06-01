const Review=require("../models/review");
const Listing=require("../models/listing");

module.exports.saveCreateReview=async (req,res)=>{
    let newReview=new Review(req.body);
    newReview.author=req.user._id; // Set the author of the review to the current user
    let result=await newReview.save();
    let id=req.params.id;
    let listing=await Listing.findById(id);
    listing.reviews.push(result._id);
    await listing.save();
    req.flash("success","Successfully added a new review") //flash is used to show a success message after adding a new review
    res.redirect(`/listings/${id}`)
}

module.exports.destroyReview=async (req,res)=>{
    let {id,reviewId}=req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}}) //pull is used to remove the review id from the listing reviews array
    
    req.flash("success","Successfully deleted the review") //flash is used to show a success message after deleting a review
    res.redirect(`/listings/${id}`)
}