const connection = require('../config/connection');
const { thought, user } = require('../models');
const { getRandomName, getRandomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thougts
  await thought.deleteMany({});

  // Drop existing users
  await user.deleteMany({});

  // Create empty array to hold the students
  const thoughts = [];

  // Get some random assignment objects using a helper function that we imported from ./data
  const users = getRandomAssignments(20);

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 20; i++) {
    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    students.push({
      first,
      last,
      github,
      assignments,
    });
  }

  // Add students to the collection and await the results
  await Student.collection.insertMany(students);

  // Add courses to the collection and await the results
  await Course.collection.insertOne({
    courseName: 'UCLA',
    inPerson: false,
    students: [...students],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(students);
  console.table(assignments);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
