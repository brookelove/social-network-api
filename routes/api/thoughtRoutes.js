const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/courses/:courseId
router
  .route('/:courseId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;