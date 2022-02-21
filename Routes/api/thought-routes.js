const router = require('express').Router();
const thoughtController = require('../../Controllers/thought-controller');

router
  .route('/')
  .get(thoughtController.getThoughts)
  .post(thoughtController.createThought);

router.route('/:id').get().put().delete();

module.exports = router;
