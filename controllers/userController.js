const { User, Thought } = require('../models');
// const User = require('../models/user');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and associated thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and associated thoughts are deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
      // create a reaction 
      addFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: {friends:req.body}},
          { runValidators: true, new: true }
        )
          .then((reaction) =>
            !reaction
              ? res.status(404).json({ message: 'No friends found with this id!' })
              : res.json(reaction)
          )
          .catch((err) => res.status(500).json(err));
      },
      deleteFriend(req, res) {
        User.findOneAndRemove(
          { _id: req.params.friendId },
          { $pull: {reactions: {friendId: req.params.friendId}}},
          {runValidators: true, new: true}
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No friends with that ID' })
              : Friends.deleteMany({ _id: { $in: user.friends } })
          )
          .then(() => res.json({ message: 'Freinds were deleted!' }))
          .catch((err) => res.status(500).json(err));
      },
};
