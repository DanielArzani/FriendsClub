const mongoose = require('mongoose');
const { User, Thought } = require('../Models');
const filter = require('../utils/filterObject');

/**-------------------------
 *    GET ALL THOUGHTS
 *------------------------**/
exports.getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find({}).sort({ createdAt: 'desc' });

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
exports.createThought = async (req, res) => {
  try {
    const filteredObj = filter(req.body, 'thoughtText', 'username');

    const thought = await Thought.create(filteredObj);

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
exports.updateThought = async (req, res) => {
  try {
    const filteredObj = filter(req.body, 'thoughtText');

    const thought = await Thought.findByIdAndUpdate(
      req.params.id,
      filteredObj,
      {
        new: true,
        runValidators: true,
      }
    );

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
