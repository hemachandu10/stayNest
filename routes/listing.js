const express=require('express');
const router=express.Router();
const wrapAsync=require("../utils/wrapAsyc");
const Listing=require("../models/listing");
const {isLoggedIn,isOwner,validateListing}=require("../middleware");
const listingsController=require("../controllers/listings");


//all listings route
router.get('/',wrapAsync(listingsController.home));

// add new routes
router.get('/new',isLoggedIn,wrapAsync(listingsController.renderNewListingForm));
router.post('/',isLoggedIn ,validateListing, wrapAsync(listingsController.saveNewListing));


//show route
router.get("/:id",wrapAsync(listingsController.showListing));

// Edit and update routes
router.get('/:id/edit',isLoggedIn,isOwner,wrapAsync(listingsController.showEditForm));
router.put('/:id', isLoggedIn, isOwner, validateListing, wrapAsync(listingsController.updateListing));

//delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingsController.distroyListing));

module.exports=router;