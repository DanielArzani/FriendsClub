// Here to make so I can have autocomplete while coding
const mongoose = require('mongoose');

const { User } = require('../Models');
const filter = require('../utils/filterObject');

/**-------------------------
 *      GET ALL USERS
 *------------------------**/
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate('thoughts');

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
exports.createUser = async (req, res) => {
  try {
    // For security reasons pass in what they are allowed to enter instead of req.body
    const filteredObj = filter(req.body, 'username', 'email');

    const user = await User.create(filteredObj);

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
exports.updateUser = async (req, res) => {
  try {
    // For security reasons pass in what they are allowed to change
    const filteredObj = filter(req.body, 'username', 'email');

    const user = await User.findByIdAndUpdate(req.params.id, filteredObj, {
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
