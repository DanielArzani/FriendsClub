const mongoose = require('mongoose');
const dotenv = require('dotenv');

// For env configurations
dotenv.config({ path: './config.env' });
// New instance of express
const app = require('./app');

// Port server will run on
const port = 3000 || process.env.PORT;

/**------------------------------------------------------------------------------------
 *                          Connecting to the Database
 *  I have my database info and password stored as 2 separate variables in config.env
 * DATABASE='connection-string'
 * DATABASE_PASSWORD='somePassword'
 *  It connects to a hosted database in Mongo Atlas
 *  You can do the same or you can just can use your local database
 *-----------------------------------------------------------------------------------**/
// Un-comment this line 👇 and the one below it if you want to connect to a hosted DB like Atlas
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// mongoose.connect(DB).then(() => {
//   console.log('DB connection successful');
// });

// Use this if connecting locally
mongoose.connect('mongodb://localhost:27017/FriendsProject').then(() => {
  console.log('DB connection successful');
});

// Listen for server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
