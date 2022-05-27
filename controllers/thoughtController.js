const { Thought, User } = require('../models');
module.exports = {
    // Get all courses
    getThoughts(req, res) {
      Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // Get a course
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Create a thought
    createThought(req, res) {
      Thought.create(req.body)
        // update the user with the thought
        .then((thought) => {
          return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thought._id } },
            { new: true }
          );
        })
        .then(userWithThoughts => {
          if (!userWithThoughts) {
            return res.status(400).json({ message: 'Thought created but not with a user '});
          }
          res.json(userWithThoughts);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
        // Update a course
        
        updateThought(req, res) {
          Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
          )
            .then((thought) =>
              !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
        },
    // Delete a thought
    deleteThought(req, res) {
      Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId  },
              {$pull: {thoughts: req.params.thoughtId}},
              {new: true}
            )
        )
        .then((user) => 
        !user 
        ? res.status(404).json({ message: 'Thought was found but no user with this id', })
        : res.json({ message: 'Thought successfuly deleted!'})
        )
        .catch((err) => res.status(500).json(err));
    },

    // create a reaction 
    addReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: {reactions:req.body}},
        { runValidators: true, new: true }
      )
        .then((reaction) =>
          !reaction
            ? res.status(404).json({ message: 'No reaction found with this id!' })
            : res.json(reaction)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
      Thought.findOneAndDelete(
        { _id: req.params.thoughtId },
        { $pull: {reactions: {reactionId: req.params.paramsId}}},
        {runValidators: true, new: true}
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No reaction with that ID' })
            : Reactions.deleteMany({ _id: { $in: thought.reactions } })
        )
        .then(() => res.json({ message: 'Reaction was deleteddeleted!' }))
        .catch((err) => res.status(500).json(err));
    },
  };
  