const res = require('express/lib/response');
const { User } = require('../models');

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
    else  res.json(deletedUser);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const updateUserInfor = async (req,res) => {
  try{
    const userData = await User.findOneAndUpdate(
      { _id: req.params.studentId },
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
      { _id: req.params.studentId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true });
    
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const deleteFriend = async (req,res) => {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.studentId },
      { $pull: { friends: req.params.assignmentId} },
      { new: true });
    
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}