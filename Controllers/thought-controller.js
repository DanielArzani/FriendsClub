const mongoose = require('mongoose');
const { User, Thought } = require('../Models');

/**-------------------------
 *    GET ALL THOUGHTS
 *------------------------**/
exports.getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find({});

    res.status(200).json({
      status: 'success',
      results: thoughts.length,
      data: {
        thoughts,
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
 *    GET ONE THOUGHT
 *------------------------**/
exports.getThought = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);

    // Check to see if thought exists
    if (!thought) {
      res.status(404).json({
        status: 'success',
        data: {
          message: 'No thought exists with that ID',
        },
      });
      return;
    }

    res.status(201).json({
      status: 'success',
      data: {
        thought,
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
 *     CREATE THOUGHT
 *------------------------**/
//! For security reasons pass in what they are allowed to enter instead of req.body
exports.createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        thought,
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
 *     UPDATE THOUGHT
 *------------------------**/
//! For security reasons pass in what they are allowed to change
exports.updateThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // Check to see if thought exists
    if (!thought) {
      res.status(404).json({
        status: 'success',
        data: {
          message: 'No thought exists with that ID',
        },
      });
      return;
    }

    res.status(201).json({
      status: 'success',
      data: {
        thought,
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
 *     DELETE THOUGHT
 *------------------------**/
exports.deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);

    // Check to see if thought exists
    if (!thought) {
      res.status(404).json({
        status: 'success',
        data: {
          message: 'No thought exists with that ID',
        },
      });
      return;
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
