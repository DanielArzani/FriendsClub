const router = require('express').Router();
const thoughtController = require('../../Controllers/thought-controller');

router
  .route('/')
  .get(thoughtController.getThoughts)
  .post(thoughtController.createThought);

router
  .route('/:id')
  .get(thoughtController.getThought)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

module.exports = router;
