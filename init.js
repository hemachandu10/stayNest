const mongoose=require('mongoose');

const Listing=require("./models/listing");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/stayNest');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// this listings array is generated using chatgpt
const listings = [
  {
    title: "my new villa",
    description: "by the beach",
    price: 4200,
    location: "vizag",
    country: "india",
    image: "https://source.unsplash.com/featured/?villa,beach&sig=1"
  },
  {
    title: "luxury sea villa",
    description: "ocean view with pool",
    price: 5500,
    location: "vizag",
    country: "india",
    image: "https://source.unsplash.com/featured/?luxury,villa&sig=2"
  },
  {
    title: "cozy beach house",
    description: "perfect for weekends",
    price: 3000,
    location: "vizag",
    country: "india",
    image: "https://source.unsplash.com/featured/?beach,house&sig=3"
  },
  {
    title: "modern villa",
    description: "stylish and spacious",
    price: 4800,
    location: "vizag",
    country: "india",
    image: "https://source.unsplash.com/featured/?modern,villa&sig=4"
  },
  {
    title: "family villa",
    description: "great for families",
    price: 3500,
    location: "vizag",
    country: "india",
    image: "https://source.unsplash.com/featured/?family,home&sig=5"
  },
  {
    title: "sunset villa",
    description: "beautiful sunset view",
    price: 4600,
    location: "vizag",
    country: "india",
    image: "https://source.unsplash.com/featured/?sunset,villa&sig=6"
  },
  {
    title: "budget villa",
    description: "affordable stay",
    price: 2500,
    location: "vizag",
    country: "india",
    image: "https://source.unsplash.com/featured/?budget,house&sig=7"
  },
  {
    title: "premium villa",
    description: "top-class amenities",
    price: 7000,
    location: "vizag",
    country: "india",
    image: "https://source.unsplash.com/featured/?premium,villa&sig=8"
  },
  {
    title: "nature villa",
    description: "surrounded by greenery",
    price: 3800,
    location: "vizag",
    country: "india",
    image: "https://source.unsplash.com/featured/?nature,villa&sig=9"
  },
  {
    title: "private villa",
    description: "peaceful and isolated",
    price: 5200,
    location: "vizag",
    country: "india",
    image: "https://source.unsplash.com/featured/?private,villa&sig=10"
  },
  {
    title: "holiday villa",
    description: "perfect vacation home",
    price: 4100,
    location: "vizag",
    country: "india",
    image: "https://source.unsplash.com/featured/?holiday,villa&sig=11"
  },
  {
    title: "romantic villa",
    description: "ideal for couples",
    price: 4500,
    location: "vizag",
    country: "india",
    image: "https://source.unsplash.com/featured/?romantic,beach&sig=12"
  },
  {
    title: "luxury beach villa",
    description: "high-end experience",
    price: 8000,
    location: "vizag",
    country: "india",
    image: "https://source.unsplash.com/featured/?beach,villa,luxury&sig=13"
  },
  {
    title: "eco villa",
    description: "eco-friendly living",
    price: 3600,
    location: "vizag",
    country: "india",
    image: "https://source.unsplash.com/featured/?eco,home&sig=14"
  },
  {
    title: "classic villa",
    description: "traditional design",
    price: 3900,
    location: "vizag",
    country: "india",
    image: "https://source.unsplash.com/featured/?classic,villa&sig=15"
  }
];

Listing.deleteMany({}).then(()=>console.log('preveous data deleted')).catch((err)=>{console.log(err)});
Listing.insertMany(listings).then(()=>console.log('successful initilize')).catch((err)=>{console.log(err)});
