const express=require('express');
const app=express()

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}))

var methodOverride = require('method-override')
app.use(methodOverride('_method'))

const engine = require('ejs-mate')
app.engine('ejs', engine);
// ejs mate is just like includes got npm ejs mates website for more

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

const mongoose = require('mongoose');

const Listing=require("./models/listing");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/stayNest');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.get('/',(req,res)=>{
    res.send("hello world");
})

app.get('/listings',async (req,res)=>{
    let alllistings= await Listing.find();
    // console.log(alllistings);
    res.render("home.ejs",{alllistings})
})

// add new routes

app.get('/listings/new',(req,res)=>{
    res.render("new.ejs");
})
app.post('/listings', async (req,res)=>{
    console.log(req.body)
    let document=new Listing(req.body.listing)
    await document.save()
    res.redirect("/listings")
})

// Edit and update routes
app.get('/listings/:id/edit',async (req,res)=>{
     let id=req.params.id;
    // console.log(id);
    let listing=await Listing.findById({_id:id})
    // console.log(listing)
    res.render('edit.ejs',{listing})
})
app.put('/listings/:id',async (req,res)=>{
    //finding document and deleting drawback is edit element comes last in list and more computions

    // let id=req.params.id;
    // console.log(id)
    // console.log(req.body)
    // await Listing.findByIdAndDelete({_id:id})
    // let document=new Listing(req.body.listing)
    // await document.save()
    // res.redirect(`/listings`)

    let id=req.params.id;
    await Listing.findByIdAndUpdate(id,{...req.body.listing}) 
    res.redirect(`/listings/${id}`);
})

app.get("/listings/:id",async (req,res)=>{
    let id=req.params.id;
    // console.log(id);
    let listing=await Listing.findById({_id:id})
    // console.log(listing)
    res.render("show.ejs",{listing})
})

//delete route
app.delete("/listings/:id",async (req,res)=>{
    let id=req.params.id;
    //console.log(id)
    await Listing.findByIdAndDelete(id)
    res.redirect("/listings")
})

app.listen(8080,()=>{
    console.log("server is running ...");
})