const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);
// /api/users/:userId
router.route('/:userId').get(getSingleUser);
// create a new user 
router.route('/:userId').put(updateUser);
// delete user 
router.route(':/userId').delete(deleteUser);

module.exports = router;