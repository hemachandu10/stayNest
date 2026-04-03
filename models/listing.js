const mongoose=require("mongoose");

const listingSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        type:String,
        default:"images\chema-photo-t2vrK9yL2Bg-unsplash.jpg",
        // whem image is not mentioned
        set:(v) => v === "" ? "images\chema-photo-t2vrK9yL2Bg-unsplash.jpg" : v,
        // set works when image is give as empty
    },
    price:Number,
    location:String,
    country:String,
});

const Listing=mongoose.model("Listing",listingSchema);
// listing collection gets created
module.exports=Listing;