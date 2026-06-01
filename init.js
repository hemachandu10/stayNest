const mongoose=require('mongoose');

const Listing=require("./models/listing");

main().then(()=>console.log("connected")).catch(err => console.log(err));

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
    address: "Beach Road, RK Beach",
    contactNumber: "9876543210",
    image: "https://www.sourcesplash.com/i/random?q=villa,beach&sig=1"
  },
  {
    title: "luxury sea villa",
    description: "ocean view with pool",
    price: 5500,
    location: "vizag",
    country: "india",
    address: "Lawsons Bay Colony",
    contactNumber: "9876543211",
    image: "https://www.sourcesplash.com/i/random?q=luxury,villa&sig=2"
  },
  {
    title: "cozy beach house",
    description: "perfect for weekends",
    price: 3000,
    location: "vizag",
    country: "india",
    address: "Rushikonda Beach Road",
    contactNumber: "9876543212",
    image: "https://www.sourcesplash.com/i/random?q=beach,house&sig=3"
  },
  {
    title: "modern villa",
    description: "stylish and spacious",
    price: 4800,
    location: "vizag",
    country: "india",
    address: "MVP Colony Sector 6",
    contactNumber: "9876543213",
    image: "https://www.sourcesplash.com/i/random?q=modern,villa&sig=4"
  },
  {
    title: "family villa",
    description: "great for families",
    price: 3500,
    location: "vizag",
    country: "india",
    address: "Seethammadhara Main Road",
    contactNumber: "9876543214",
    image: "https://www.sourcesplash.com/i/random?q=family,home&sig=5"
  },
  {
    title: "sunset villa",
    description: "beautiful sunset view",
    price: 4600,
    location: "vizag",
    country: "india",
    address: "Yendada Village",
    contactNumber: "9876543215",
    image: "https://www.sourcesplash.com/i/random?q=sunset,villa&sig=6"
  },
  {
    title: "budget villa",
    description: "affordable stay",
    price: 2500,
    location: "vizag",
    country: "india",
    address: "Gajuwaka Junction",
    contactNumber: "9876543216",
    image: "https://www.sourcesplash.com/i/random?q=budget,house&sig=7"
  },
  {
    title: "premium villa",
    description: "top-class amenities",
    price: 7000,
    location: "vizag",
    country: "india",
    address: "Beach Road, Siripuram",
    contactNumber: "9876543217",
    image: "https://www.sourcesplash.com/i/random?q=premium,villa&sig=8"
  },
  {
    title: "nature villa",
    description: "surrounded by greenery",
    price: 3800,
    location: "vizag",
    country: "india",
    address: "Anandapuram Hills",
    contactNumber: "9876543218",
    image: "https://www.sourcesplash.com/i/random?q=nature,villa&sig=9"
  },
  {
    title: "private villa",
    description: "peaceful and isolated",
    price: 5200,
    location: "vizag",
    country: "india",
    address: "Bheemili Coastal Road",
    contactNumber: "9876543219",
    image: "https://www.sourcesplash.com/i/random?q=private,villa&sig=10"
  },
  {
    title: "holiday villa",
    description: "perfect vacation home",
    price: 4100,
    location: "vizag",
    country: "india",
    address: "Madhurawada IT Hills",
    contactNumber: "9876543220",
    image: "https://www.sourcesplash.com/i/random?q=holiday,villa&sig=11"
  },
  {
    title: "romantic villa",
    description: "ideal for couples",
    price: 4500,
    location: "vizag",
    country: "india",
    address: "Tenneti Park Road",
    contactNumber: "9876543221",
    image: "https://www.sourcesplash.com/i/random?q=romantic,beach&sig=12"
  },
  {
    title: "luxury beach villa",
    description: "high-end experience",
    price: 8000,
    location: "vizag",
    country: "india",
    address: "Rushikonda Beach Front",
    contactNumber: "9876543222",
    image: "https://www.sourcesplash.com/i/random?q=beach,villa,luxury&sig=13"
  },
  {
    title: "eco villa",
    description: "eco-friendly living",
    price: 3600,
    location: "vizag",
    country: "india",
    address: "Pendurthi Green Valley",
    contactNumber: "9876543223",
    image: "https://www.sourcesplash.com/i/random?q=eco,home&sig=14"
  },
  {
    title: "classic villa",
    description: "traditional design",
    price: 3900,
    location: "vizag",
    country: "india",
    address: "Old Town Heritage Street",
    contactNumber: "9876543224",
    image: "https://www.sourcesplash.com/i/random?q=classic,villa&sig=15"
  }
];

async function initDB() {
  try {
    await Listing.deleteMany({});
    console.log("previous data deleted");
    for (let listing of listings) {
      listing.owner = "6a1bc6e0dac9fc604c1778c3"; // Replace with the actual user ID you want to set as the owner
    }
    await Listing.insertMany(listings);
    //console.log(listings);
    console.log("successful initialize");

  } catch (err) {
    console.log(err);
  }
}

initDB();

