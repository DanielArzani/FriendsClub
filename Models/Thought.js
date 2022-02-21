const mongoose = require('mongoose');
const { format } = require('timeago.js');

// Sub-document ~ Reactions to thoughts
const reactionSchema = new mongoose.Schema({
  // set custom id to avoid confusion with parent thought _id
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    // Will generate a new ObjectId
    default: new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: [true, 'A reaction requires a reactionBody'],
    minLength: [1, 'A reaction must be at least 1 character'],
    maxLength: [280, 'A reaction must be at most 280 characters'],
  },
  // User who posted the reaction
  username: {
    type: String,
    required: [true, 'A reaction must have a user'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // See thoughtSchema createdAt for comments on this
    get: (dateInstance) => {
      const stringDate = dateInstance.toString();
      const parsedStringDate = Date.parse(stringDate);
      return format(parsedStringDate);
    },
  },
});

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: [true, 'To leave a thought, you must have a thoughtText'],
      minLength: [1, 'Your thoughtText must be at least 1 character long '],
      maxLength: [128, 'Your thoughtText must be at most 128 characters long '],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Getter using timeAgo.js
      get: (dateInstance) => {
        // Turn date to a string
        const stringDate = dateInstance.toString();
        // Parse back into a timestamp in ms
        const parsedStringDate = Date.parse(stringDate);
        // Use timeAgo library to format date
        /**---------------------------------------------------------------------------------------
         *@formatFunction Formats date to "how long ago it was created", like in twitter
         *@examples format(1645412903580) -> 6 minutes ago, format(164541123123) -> 20 days ago
         *--------------------------------------------------------------------------------------**/
        return format(parsedStringDate);
      },
    },
    // User who created the thought
    username: {
      type: String,
      required: [true, 'A thought must have a user'],
    },
  },
  // Reactions to thoughts (kind of like replies)
  //   reactions: {}
  {
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true },
    // We set id to false because this is a virtual that Mongoose returns, and we don’t need it
    id: false,
  }
);

/**-------------------------
 *        VIRTUALS
 *------------------------**/
// Retrieves the length of the thought's reactions array field on query

const Thought = mongoose.model('Thought', thoughtSchema);
module.exports = Thought;
