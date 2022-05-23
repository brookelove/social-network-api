const { thought, user } = require('../models');
module.exports = {
    // Get all courses
    getThoughts(req, res) {
      thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // Get a course
    getSingleThought(req, res) {
      thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Create a course
    createThought(req, res) {
      Course.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // Delete a course
    deleteThought(req, res) {
      Course.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : Reactions.deleteMany({ _id: { $in: thought.reactions } })
        )
        .then(() => res.json({ message: 'Thought and reactions deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
    // Update a course
    updateCourse(req, res) {
      Course.findOneAndUpdate(
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
  };
  