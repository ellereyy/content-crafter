const mongoose = require('mongoose');

const seedPosts = 

[
  {
    image: "https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "A scenic view of the mountains",
    keywords: "backcountry, hiking, nature",
    targetAudience: "Adventure seekers looking for a challenge",
    caption: "Join us on an unforgettable backcountry hike through the mountains! Our expert guides will lead you on a challenging but rewarding journey through some of the most beautiful natural scenery in the world.",
    date: new Date("2023-05-01T12:00:00Z"),
    userId: new mongoose.Types.ObjectId('644ad59f9f1e02894322664b'),
},
  {
    image: "https://images.pexels.com/photos/1009401/pexels-photo-1009401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "A group of hikers crossing a river",
    keywords: "backcountry, hiking, river",
    targetAudience: "Hikers looking for an exciting new challenge",
    caption: "Looking for a new hiking challenge? Our backcountry guides can take you on an adventure you'll never forget! From crossing rivers to scaling mountains, we'll help you push your limits and experience the beauty of nature like never before.",
    date: new Date("2023-05-05T10:00:00Z"),
    userId: new mongoose.Types.ObjectId('644ad59f9f1e02894322664b'),
  },
  {
    image: "https://images.pexels.com/photos/238622/pexels-photo-238622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "A group of hikers enjoying a beautiful view",
    keywords: "backcountry, hiking, view",
    targetAudience: "Nature enthusiasts looking for a unique experience",
    caption: "Get off the beaten path and explore the backcountry with our expert guides! From breathtaking mountain vistas to stunning forest landscapes, we'll take you on a journey through some of the most beautiful natural scenery in the world.",
    date: new Date("2023-05-10T14:00:00Z"),
    userId: new mongoose.Types.ObjectId('644ad59f9f1e02894322664b'),
  }
]


// [
//   {
//     image: 'https://images.pexels.com/photos/1139541/pexels-photo-1139541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//     description: 'A beautiful sunset at the beach',
//     caption: 'Enjoying the breathtaking sunset at the beach',
//     hashtags: '#beachlife #sunsetlovers',
//     date: new Date('2023-05-01T15:00:00Z'),
//     userId: new mongoose.Types.ObjectId('644ad59f9f1e02894322664b'),
//   },
//   {
//     image: 'https://images.pexels.com/photos/3860306/pexels-photo-3860306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//     description: 'A cute puppy playing with a ball',
//     caption: 'Meet my new furry friend!',
//     hashtags: '#puppylove #dogsofinstagram',
//     date: new Date('2023-05-03T10:00:00Z'),
//     userId: new mongoose.Types.ObjectId('644ad59f9f1e02894322664b'),
//   },
//   {
//     image: 'https://images.pexels.com/photos/8951203/pexels-photo-8951203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//     description: 'A delicious plate of sushi',
//     caption: 'Satisfying my cravings for sushi',
//     hashtags: '#sushilove #foodie',
//     date: new Date('2023-05-05T18:00:00Z'),
//     userId: new mongoose.Types.ObjectId('644ad59f9f1e02894322664b'),
//   },
// ]


// const seedUser = [
//   {
//     email: 'name@example.com',
//     password: 'password123',
//     name: 'John Doe',
//     goals: 'increase sales with call to action posts',
//   },
// ]

module.exports = seedPosts;
