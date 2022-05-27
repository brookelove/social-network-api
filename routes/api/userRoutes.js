const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend

} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);
// delete user 
router.route('/:userId').delete(deleteUser);
// /api/users/:userId
router.route('/:userId').get(getSingleUser);
// create a new user 
router.route('/:userId').put(updateUser);
// add a friend
router.route('/:userId/friends/:friendId').post(addFriend);
// delete friends
router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;