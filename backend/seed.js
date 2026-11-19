// Run once with: npm run seed
// Wipes profiles + swipes and inserts 30 mock profiles (10 already like you).
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Profile from './models/Profile.js';
import Swipe from './models/Swipe.js';

// [name, age, city/college, bio, interests, likesMe]
const SEED = [
  ["Aanya", 21, "Delhi University", "Chai over coffee, always. Will beat you at Ludo.", ["Music", "Travel", "Chai"], 1],
  ["Rohan", 22, "IIT Delhi", "Builds side projects at 2am. Ask me about my robot.", ["Coding", "Gaming", "Cricket"], 0],
  ["Priya", 20, "Chandigarh", "Dog mom. Weekend trekker. Maggi expert.", ["Dogs", "Trekking", "Food"], 1],
  ["Kabir", 23, "Pune", "Guitarist in a band that practices more than it performs.", ["Guitar", "Movies", "Photography"], 0],
  ["Meera", 21, "Jaipur", "Sketchbook in my bag, cold coffee in my hand.", ["Art", "Coffee", "Books"], 1],
  ["Arjun", 24, "Bengaluru", "Startup intern. Will talk about biryani for hours.", ["Startups", "Biryani", "Running"], 0],
  ["Sneha", 22, "Mumbai", "Film school kid. Rewatching Dil Chahta Hai again.", ["Films", "Writing", "Beaches"], 1],
  ["Vikram", 25, "Hyderabad", "Gym in the morning, gaming at night.", ["Gym", "Gaming", "Cars"], 0],
  ["Ishita", 20, "Delhi", "Dancer. Kathak by training, Bollywood by heart.", ["Dance", "Fashion", "Music"], 1],
  ["Dev", 23, "Lucknow", "Poetry, street food and slow walks.", ["Poetry", "Food", "Walking"], 0],
  ["Tanvi", 21, "Ahmedabad", "Baker. Brownies are my love language.", ["Baking", "Travel", "Yoga"], 0],
  ["Aditya", 22, "Kolkata", "Football fanatic, adda enthusiast.", ["Football", "Adda", "History"], 1],
  ["Naina", 24, "Chennai", "Bharatanatyam and filter coffee.", ["Dance", "Coffee", "Movies"], 0],
  ["Karan", 23, "Gurugram", "Product designer. Opinions about fonts.", ["Design", "Coffee", "Cycling"], 0],
  ["Riya", 19, "Dehradun", "Mountains are calling and so is my mom.", ["Trekking", "Photography", "Maggi"], 1],
  ["Siddharth", 25, "Indore", "Stand-up comedy open mics. Be nice to me.", ["Comedy", "Food", "Podcasts"], 0],
  ["Kavya", 22, "Kochi", "Marine biology student. Beach person.", ["Ocean", "Reading", "Swimming"], 1],
  ["Harsh", 21, "Surat", "Chess, cricket and chai. In that order.", ["Chess", "Cricket", "Chai"], 0],
  ["Pooja", 23, "Bhopal", "Plant parent of 14 and counting.", ["Plants", "Cooking", "Yoga"], 0],
  ["Nikhil", 24, "Noida", "Full-stack dev. Yes, I use dark mode.", ["Coding", "Anime", "Coffee"], 1],
  ["Simran", 20, "Amritsar", "Punjabi music, parathas, long drives.", ["Music", "Food", "Road trips"], 0],
  ["Yash", 22, "Nagpur", "Photographer. I will take your photo whether you like it or not.", ["Photography", "Travel", "Cinema"], 0],
  ["Diya", 21, "Goa", "Sunsets, thrift shopping, bad puns.", ["Thrifting", "Beaches", "Music"], 1],
  ["Manav", 26, "Shimla", "Cafe owner. Free coffee for good conversation.", ["Coffee", "Hiking", "Books"], 0],
  ["Ananya", 22, "Varanasi", "Classical music, ghats, and deep thoughts.", ["Music", "Spirituality", "Poetry"], 0],
  ["Rahul", 23, "Patna", "UPSC aspirant who needs a break. Rescue me.", ["Reading", "Cricket", "Debates"], 1],
  ["Tara", 20, "Mysuru", "Illustrator. Cats over everything.", ["Art", "Cats", "Anime"], 0],
  ["Ayaan", 24, "Srinagar", "Walnut trees, snow and slow mornings.", ["Nature", "Photography", "Food"], 0],
  ["Zoya", 21, "Bhubaneswar", "Debater, foodie, occasional runner.", ["Debate", "Food", "Running"], 1],
  ["Ishaan", 22, "Yamuna Nagar", "Cricket on weekends, code on weeknights.", ["Cricket", "Coding", "Movies"], 0],
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/swipe-app");

  await Swipe.deleteMany({});
  await Profile.deleteMany({});

  await Profile.insertMany(
    SEED.map(([name, age, city, bio, interests, likesMe], i) => ({
      name,
      age,
      city,
      bio,
      interests,
      likesMe: likesMe === 1,
      photo: `https://i.pravatar.cc/500?img=${(i % 70) + 1}`,
    }))
  );

  await Swipe.init(); // make sure the unique index exists
  console.log(`Seeded ${SEED.length} profiles (${SEED.filter((s) => s[5] === 1).length} like you)`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error("Seeding failed:", err.message);
  process.exit(1);
});