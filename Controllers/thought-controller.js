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
exports.getThought = async (req, res) => {};

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
exports.updateThought = async (req, res) => {};

/**-------------------------
 *     DELETE THOUGHT
 *------------------------**/
exports.deleteThought = async (req, res) => {};
