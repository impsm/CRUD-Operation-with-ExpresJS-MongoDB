const express = require('express');
const router = express.Router(); 

// import the controller file for fcuntions
const userController = require('../Controllers/UserController');

// use 
router.get('/', userController.baseRoute);

// create a single user
router.post('/create', userController.createUser);

// create multiple users
router.post('/createUsers', userController.createMultipleUsers);

// read all
router.get('/getAllUsers', userController.getUsers);

// read one
router.get('/getUser/:id', userController.getSingleUser);

// get users by age
router.get('/getUsers/:age', userController.getUsersByAge);

// update
router.put('/user/:id/update', userController.updateUser);

// delete
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;