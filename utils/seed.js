const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUser, thoughtBodies} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Thought.deleteMany({});
  // await user.deleteMany({});

  const users = [];

  // for (let i = 0; i < 1; i++) {
    const fullUser = getRandomUser();
    console.log('FULL USER: ', fullUser);
    users.push(fullUser);
  // }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughtBodies);

  // loop through the saved thougts, for each thought we need to generate a thought response and insert the thought responses
  console.table(users);
  console.table(thoughtBodies);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
