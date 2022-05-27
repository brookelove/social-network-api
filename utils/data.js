const names = [
    {
      username:'Aaran',
      email: 'aran.aran@gmail.com'
    },
    {
      username: 'Willow',
      email: 'willow.willow@gmail.com',
    }
  ];

  const thoughtBodies = [
    {
    thougthText: 'How to disagree with someone',
    username: 'Willow'
    },
    {
      thougthText: 'iPhone review',
      username: "Willow"
    },
    {
      thougthText: 'how-to video',
      username: "Aaran"
    },
  ];
  
  const possibleResponses = [
    'I disagree!',
    'I tried your algorithm, here were the results',
    'This was awesome',
    'Thank you for the great content',
    'Please check out my video response',
    'Like and subscribe to my channel please',
    'Reply: The side effects of in app purchases on digital marketplaces',
  ];

  const users = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Get a random item given an array
const getRandomThought = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random user
const getRandomUser = () => getRandomArrItem(names);

// Function to generate random videos that we can add to the database. Includes video responses.
// const getRandomVideos = (int) => {
//   let results = [];
//   for (let i = 0; i < int; i++) {
//     results.push({
//       description: getRandomArrItem(thoughtBodies),
//       responses: [...getThoughtResponses(3)],
//     });
//   }
//   return results;
// };

// Create the responses that will be added to each video
const getThoughtResponses = (int) => {
  if (int === 1) {
    return getRandomArrItem(possibleResponses);
  }
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      responseBody: getRandomArrItem(possibleResponses),
      username: getRandomName(),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomUser, getRandomThought, thoughtBodies };
