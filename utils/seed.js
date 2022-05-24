const connection = require('../config/connection');
const { user, thought } = require('../models');
const { getRandomName, getRandomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await thought.deleteMany({});
  // await user.deleteMany({});

  const users = [];
  const thoughts = getRandomThought(10);

  for (let i = 0; i < 20; i++) {
    const fullUser = getRandomUser();

    users.push({
      fullUser,
    });
  }

  await user.collection.insertMany(users);
  await thought.collection.insertMany(thoughts);

  // loop through the saved thougts, for each thought we need to generate a thought response and insert the thought responses
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
