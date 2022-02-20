const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'You must choose a username'],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'You must have an email'],
      validate: [validator.isEmail, 'Not a valid email address'],
    },
    //   thoughts: Array,
    //   friends: Array,
  },
  {
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true },
    // We set id to false because this is a virtual that Mongoose returns, and we don’t need it
    id: false,
  }
);

const User = new mongoose.model('User', userSchema);

module.exports = User;
