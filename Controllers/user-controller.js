// Here to make so I can have autocomplete while coding
const mongoose = require('mongoose');

const { User } = require('../Models');

/**-------------------------
 *      GET ALL USERS
 *------------------------**/
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      data: {
        message: error,
      },
    });
  }
};

/**-------------------------
 *      GET ONE USER
 *------------------------**/
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // Check to see if user exists
    if (!user) {
      res.status(404).json({
        status: 'fail',
        data: {
          message: 'No user found with this ID',
        },
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      data: {
        message: error,
      },
    });
  }
};

/**-------------------------
 *      CREATE USER
 *------------------------**/
//! For security reasons pass in what they are allowed to enter instead of req.body
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    // If either username or email already exist, will throw this error
    if (error.code === 11000) {
      res.status(500).json({
        status: 'error',
        data: {
          message: 'Both username and email must be unique ',
        },
      });
      return;
    }

    res.status(500).json({
      status: 'error',
      data: {
        message: error,
      },
    });
  }
};

/**-------------------------
 *      UPDATE USER
 *------------------------**/
//! For security reasons pass in what they are allowed to change
exports.updateUser = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // Check to see if user exists
    if (!user) {
      res.status(404).json({
        status: 'fail',
        data: {
          message: 'No user found with this ID',
        },
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    // If either username or email already exist, will throw this error
    if (error.code === 11000) {
      res.status(500).json({
        status: 'error',
        data: {
          message: 'Both username and email must be unique ',
        },
      });
      return;
    }

    res.status(500).json({
      status: 'error',
      data: {
        message: error,
      },
    });
  }
};

/**-------------------------
 *      DELETE USER
 *------------------------**/
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    // Check to see if user exists
    if (!user) {
      res.status(404).json({
        status: 'fail',
        data: {
          message: 'No user found with this ID',
        },
      });
    }

    res.status(204).json({
      status: 'success',
      data: {
        data: null,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      data: {
        message: error,
      },
    });
  }
};
