const {User,Thought } = require('../models');

const getAllUsers = async (req,res) => {
   try {
    const userData = await User.find();
    res.json(userData);
   }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getSingleUser = async (req,res) => {
  try {
    const userData = await User.find({_id: req.params.userID});
    if (!userData) { 
      res.status(404).json({ message: 'No user with that ID' });
    }
    else  res.json(userData);
   }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const createNewUser = async (req,res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser)
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const deleteUser = async (req,res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.userID);
    if (!deletedUser) { 
      res.status(404).json({ message: 'No user with that ID' });
    }
    else  {
      const deletedThought = await Thought.deleteMany({ _id: { $in: deletedUser.thoughts}})
      res.json(deletedUser);
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const updateUserInfor = async (req,res) => {
  try{
    const userData = await User.findOneAndUpdate(
      { _id: req.params.userID },
      { ...req.body },
      { runValidators: true, new: true });
      if (!userData) { 
        res.status(404).json({ message: 'No user with that ID' });
      }
      else  res.json(userData);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const addFriend = async (req,res) => {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.userID },
      { $addToSet: { friends: {_id:req.params.friendID} } },
      {runValidators: true, new: true });

    if (!userData) { 
      res.status(404).json({ message: 'No user with that ID' });
    }
    else  res.json(userData);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const deleteFriend = async (req,res) => {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.userID },
      { $pull: { friends: req.params.friendID } },
      { new: true });

    if (!userData) { 
      res.status(404).json({ message: 'No user with that ID' });
    }
    else  res.json(userData);
    
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

module.exports = {getAllUsers,getSingleUser,createNewUser,deleteUser,updateUserInfor,addFriend,deleteFriend,}