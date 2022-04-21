const connection = require('../config/connection');
const userData = require('./userData.json')

connection.on('error', (err) => err);

// Start the seeding runtime timer
console.time('seeding');

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await User.deleteMany({});

  // Add students to the collection and await the results
  await User.collection.insertMany(userData);

  
  // Log out the seed data to indicate what should appear in the database
  console.table(userData);
  console.info('Seeding complete! 🌱');
  console.timeEnd('seeding');
  process.exit(0);
});
