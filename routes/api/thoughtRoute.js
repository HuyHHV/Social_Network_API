const router = require('express').Router();
const thoughtController = require('../../controllers/thoughtController');
const reactionController = require('../../controllers/reactionController.js');

// /api/thoughts
router.route('/')
.get(thoughtController.getAllThought)
.post(thoughtController.createThought)

//  /api/thoughts/:thoughtID
router.route('/:thoughtID')
.get(thoughtController.getSingleThought)
.put(thoughtController.updateThought)
.delete(thoughtController.deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtID/reactions')
.post(reactionController.addReaction);


// /api/thoughts/:thoughtId/reactions/:reactionID
router.route('/:thoughtID/reactions/:reactionID')
.delete(reactionController.removeReaction);

module.exports = router;
