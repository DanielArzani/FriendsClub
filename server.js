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
 *  It connects to a hosted database in Mongo Atlas
 *  You can do the same thing or you can just use the the commented out version which
 *  will connect to a local database
 *-----------------------------------------------------------------------------------**/
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB connection successful');
});

// Un-comment this line 👇 if you want to connect locally and comment or delete the above
// mongoose.connect('mongodb://localhost:27017/FriendsProject').then(() => {
//   console.log('DB connection successful');
// });

// Listen for server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
