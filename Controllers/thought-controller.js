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
    // const filteredObj = filter(req.body, 'thoughtText', 'username');

    const thought = await Thought.create({
      thoughtText: req.body.thoughtText,
      username: req.params.userId,
    });

    const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
      $push: { thoughts: thought },
    });

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

/**-------------------------
 *     CREATE REACTION
 *------------------------**/
exports.createReaction = async (req, res) => {
  try {
    // 1) Find a Thought through their ID where this Reaction will be nested into
    // 2) Set fields for what they can put into the req.body
    // 3) $push into reactions field array
    const filteredObj = filter(req.body, 'reactionBody', 'username');

    const reaction = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: filteredObj } },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        reaction,
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
 *     DELETE REACTION
 *------------------------**/
exports.deleteReaction = async (req, res) => {
  try {
    // 1) Find a Thought through their ID and a Reaction that belongs to it through its reactionID
    // 2) $pull from reactions field array
    const reaction = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: req.body } },
      {
        new: true,
        runValidators: true,
      }
    );

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
