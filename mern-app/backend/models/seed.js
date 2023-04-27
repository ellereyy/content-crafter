const mongoose = require('mongoose');

const seedPosts = [
  {
    image: 'https://images.pexels.com/photos/1139541/pexels-photo-1139541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A beautiful sunset at the beach',
    caption: 'Enjoying the breathtaking sunset at the beach',
    hashtags: '#beachlife #sunsetlovers',
    date: new Date('2023-05-01T15:00:00Z'),
    userId: new mongoose.Types.ObjectId('6448c5a2a71a436ec9376db7'),
  },
  {
    image: 'https://images.pexels.com/photos/3860306/pexels-photo-3860306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A cute puppy playing with a ball',
    caption: 'Meet my new furry friend!',
    hashtags: '#puppylove #dogsofinstagram',
    date: new Date('2023-05-03T10:00:00Z'),
    userId: new mongoose.Types.ObjectId('6448c5a2a71a436ec9376db7'),
  },
  {
    image: 'https://images.pexels.com/photos/8951203/pexels-photo-8951203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A delicious plate of sushi',
    caption: 'Satisfying my cravings for sushi',
    hashtags: '#sushilove #foodie',
    date: new Date('2023-05-05T18:00:00Z'),
    userId: new mongoose.Types.ObjectId('6448c5a2a71a436ec9376db7'),
  },
];


// const seedUser = [
//   {
//     email: 'name@example.com',
//     password: 'password123',
//     name: 'John Doe',
//     goals: 'increase sales with call to action posts',
//   },
// ]

module.exports = seedPosts;
