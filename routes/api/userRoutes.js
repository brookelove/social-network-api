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
// /api/users/:userId
router.route('/:userId').get(getSingleUser);
// create a new user 
router.route('/:userId').put(updateUser);
// delete user 
router.route(':/userId').delete(deleteUser);
// add a friend
router.route('/:userId').post(addFriend);
// delete friends
router.route('/:userId').delete(deleteFriend);

module.exports = router;