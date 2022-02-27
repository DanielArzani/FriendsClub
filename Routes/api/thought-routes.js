const router = require('express').Router();
const thoughtController = require('../../Controllers/thought-controller');

router
  .route('/')
  .get(thoughtController.getThoughts)
  .post(thoughtController.createThought);

router
  .route('/:thoughtId')
  .get(thoughtController.getThought)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

// Reaction Routes
router
  .route('/:thoughtId/reactions')
  .post(thoughtController.createReaction)
  .delete(thoughtController.deleteReaction);

module.exports = router;
