const Listing=require("../models/listing");

module.exports.home=async (req,res)=>{
   let alllistings= await Listing.find();
    res.render("home.ejs",{alllistings})
}

module.exports.renderNewListingForm=async (req,res)=>{
    res.render("new.ejs");
}

module.exports.showListing=async (req,res)=>{
    let id=req.params.id;
    let listing=await Listing.findById({_id:id}).populate({path:"reviews",populate:{path:"author"}}).populate("owner"); //populate is used to get the review details instead of just the review id
    if(!listing){
        req.flash("error","Cannot find the listing") //flash is used to show an error message if the listing is not found
        return res.redirect("/listings")
    }
    res.render("show.ejs",{listing})
}        

module.exports.saveNewListing=async (req,res)=>{
    let document=new Listing(req.body.listing)
    document.owner = req.user._id; // Set the owner of the listing to the current user
    await document.save()
    req.flash("success","Successfully made a new listing") //flash is used to show a success message after creating a new listing
    res.redirect("/listings")
}        

module.exports.showEditForm=async (req,res)=>{
    let id=req.params.id;
    let listing=await Listing.findById({_id:id})
    res.render('edit.ejs',{listing})
}

module.exports.updateListing=async (req,res)=>{
        let id=req.params.id;
        await Listing.findByIdAndUpdate(id,{...req.body.listing}) 
        req.flash("success","Successfully updated the listing") //flash is used to show a success message after updating a listing
        res.redirect(`/listings/${id}`);
}        

module.exports.distroyListing=async (req,res)=>{
    let id=req.params.id;
    await Listing.findByIdAndDelete(id)
    req.flash("success","Successfully deleted the listing") //flash is used to show a success message after deleting a listing
    res.redirect("/listings")
}    
