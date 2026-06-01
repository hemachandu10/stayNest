const mongoose=require("mongoose");
const Review=require("./review");

const listingSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        type:String,
        default:"/images/stayNext.jpg",
        // whem image is not mentioned
        set:(v) => v === "" ? "/images/stayNext.jpg" : v,
        // set works when image is give as empty
    },
    price:Number,
    location:String,
    country:String,
    address:String,
    contactNumber:String,
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review",
    }], 
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
});

listingSchema.post("findOneAndDelete",async function(listing){
    console.log(listing);
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}}) //deleteMany is used to delete all the reviews whose id is in the listing.reviews array;
    }
});

const Listing=mongoose.model("Listing",listingSchema);
// listing collection gets created
module.exports=Listing;