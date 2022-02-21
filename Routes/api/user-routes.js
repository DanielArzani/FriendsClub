const router = require('express').Router();
const userController = require('../../Controllers/user-controller');

router.route('/').get(userController.getUsers).post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

// Friend Routes
router
  .route('/:userId/friends/:friendId')
  .post(userController.addFriend)
  .delete(userController.deleteFriend);

module.exports = router;
