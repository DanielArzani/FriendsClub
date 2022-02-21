// THIS SCRIPT WILL TAKE ALL OF THE JSON DATA AND ADD IT TO THE DATABASE
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { User } = require('../../Models');

// We can use this in any file with out requiring it because the process is the same for every file
// Note that this must be before app
dotenv.config({ path: './config.env' });

// You can also just add the password in the config.env file
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// These options are only necessary because we're using an old version of mongoose
mongoose.connect(DB).then(() => {
  console.log('DB connection successful');
});

// Read JSON File
const users = JSON.parse(
  // fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
  fs.readFileSync(`${__dirname}/users.json`, 'utf-8')
);

// Import data into DB
const importData = async () => {
  try {
    await User.create(users);
  } catch (error) {
    console.log(error);
  }
  // An aggressive way of closing an application
  process.exit();
};

// Delete all data from DB
const deleteData = async () => {
  try {
    // Passing in nothing will delete all documents in a certain collection
    await User.deleteMany();
    console.log('Data successfully deleted');
  } catch (error) {
    console.log(error);
  }
  // An aggressive way of closing an application
  process.exit();
};

/**------------------------------------------------
 *                   HOW TO USE
 *   1. This will let you import fake user data or
 *      delete all user data in your DB
 *   2.Open your command line and simply copy the
 *     line that after To import: or to Delete:
 *     in order to either import or delete the fake
 *     user data
 *------------------------------------------------**/
//^ To import: node dev-data/data/import-dev-data.js --import
//^ To Delete: node dev-data/data/import-dev-data.js --delete
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

// console.log(process.argv);
