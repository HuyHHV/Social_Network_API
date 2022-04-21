const router = require('express').Router();
const thoughtController = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(thoughtController.getAllThought)

//  /api/thoughts/:thoughtID
router.route('/:thoughtID')
.get(thoughtController.getSingleThought)
.put(thoughtController.updateThought)
.delete(thoughtController.deleteThought)

module.exports = router;
