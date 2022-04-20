const router = require('express').Router();
const userController = require('../../controllers/userController');

// /api/users
router.route('/').get(userController.getAllUsers).post(userController.createNewUser);

// /api/users/:userID
router.route('/:userID')
.get(userController.getSingleUser)
.delete(userController.deleteUser)
.post(userController.updateUserInfor);

// /api/users/:userID/:friendID
router.route('/:userID/:friendID')
.post(userController.addFriend)
.delete(userController.deleteFriend);


module.exports = router;
