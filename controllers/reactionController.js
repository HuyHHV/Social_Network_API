const { Thought } = require("../models");

const addReaction = async (req,res) => {
    try{
        const reactionData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtID },
            { $addToSet: {reactions: req.body } },
            { runValidators: true, new: true }
          )
          if (!reactionData) { 
            res.status(404).json({ message: 'No thought with that ID' });
          }
          else  res.json(reactionData);
      }
      catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
};

const removeReaction = async (req,res) => {
    try{
        const reactionData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtID },
            { $pull: {reactions: {reactionID:req.params.reactionID} } },
            { runValidators: true, new: true }
          )
          if (!reactionData) { 
            res.status(404).json({ message: 'No thought with that ID' });
          }
          else  res.json(reactionData);
      }
      catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
};

module.exports = {addReaction,removeReaction};