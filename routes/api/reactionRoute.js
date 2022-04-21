const router = require('express').Router();
const reactionController = require('../../controllers/reactionController');


// /api/thoughts/:thoughtId/reactions
router.route('/:reactionID')
.post(reactionController.updateReaction)
.delete(reactionController.deleteReaction)

module.exports = router;
