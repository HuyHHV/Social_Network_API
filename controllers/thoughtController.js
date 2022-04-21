const {Thought, User } = require('../models');

const getAllThought = async (req,res) => {
    try {
        const thoughtData = await Thought.find();
        res.json(thoughtData);
       }
      catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
};

const getSingleThought = async (req,res) => {
    try {
      const thoughtData = await Thought.find({_id: req.params.thoughtID});
      if (!thoughtData) { 
        res.status(404).json({ message: 'No thought with that ID' });
      }
      else  res.json(thoughtData);
     }
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };

const createThought = async (req,res) => {
    try {
        const checkUserID = await User.findById(req.body.userID);
        if (!checkUserID) {
          return res.status(404).json({ message: 'No user with that ID' });
        };
        const newThought = await Thought.create(req.body);
        const userData = await User.findOneAndUpdate(
            {_id:req.body.userID},
            {$addToSet: {thoughts:newThought._id}},
            {new:true}
        )
        res.json('new thought added');
      }
      catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
};

const updateThought = async (req,res) => {
    try{
        const thoughtData = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtID },
          { thoughtText:req.body.thoughtText },
          { runValidators: true, new: true });
          if (!thoughtData) { 
            res.status(404).json({ message: 'No thought with that ID' });
          }
          else  res.json(thoughtData);
      }
      catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
};


const deleteThought = async (req,res) => {
    try {
      const deletedThought = await Thought.findByIdAndRemove(req.params.thoughtID);
      if (!deletedThought) { 
        res.status(404).json({ message: 'No thought with that ID' });
      }
      else  {
        const userData = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtID },
            { $pull: { thoughts: req.params.thoughtID } },
            { new: true }
          )
        res.json(userData);
      }
    }
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };

module.exports = {getAllThought,getSingleThought,createThought,updateThought,deleteThought}