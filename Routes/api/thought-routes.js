const router = require('express').Router();
const thoughtController = require('../../Controllers/thought-controller');

router.route('/').get(thoughtController.getThoughts);

router.route('/:userId').post(thoughtController.createThought);

// /:id here is thoughtId
router
  .route('/:id')
  .get(thoughtController.getThought)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

// Reaction Routes
router.route('/:thoughtId/reactions').post(thoughtController.createReaction);

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(thoughtController.deleteReaction);

module.exports = router;
