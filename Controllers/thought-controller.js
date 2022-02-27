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
    const thought = await Thought.findById(req.params.thoughtId);

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
    const user = await User.findById(req.body.userId);

    if (!user) {
      res.status(404).json({
        status: 'fail',
        data: {
          message: 'No user with that ID exists',
        },
      });
      return;
    }

    const thought = await Thought.create({
      thoughtText: req.body.thoughtText,
      username: req.body.username,
    });

    await User.findByIdAndUpdate(req.body.userId, {
      $push: { thoughts: thought },
    });

    res.status(201).json({
      status: 'success',
      data: {
        thought: thought,
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
    // Only thing allowed to be changed
    const filteredObj = filter(req.body, 'thoughtText');

    // Check to see if user exists
    const user = await User.findById(req.body.userId);

    if (!user) {
      res.status(404).json({
        status: 'fail',
        data: {
          message: 'No user exists with that ID',
        },
      });
      return;
    }

    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      filteredObj,
      {
        new: true,
        runValidators: true,
      }
    );

    // Check to see if thought exists
    if (!thought) {
      res.status(404).json({
        status: 'fail',
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
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

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

    const thought = await Thought.findByIdAndUpdate(
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
 *     DELETE REACTION
 *------------------------**/
exports.deleteReaction = async (req, res) => {
  try {
    // 1) Find a Thought through their ID and a Reaction that belongs to it through its reactionID
    // 2) $pull from reactions field array
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, {
      $pull: { reactions: { reactionId: req.body.reactionId } },
    });

    if (!thought) {
      res.status(404).json({
        status: 'fail',
        data: {
          message: 'No thought found with that ID',
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
