const express = require('express');
const router = express.Router();

const userController = require('./controllers/User');

// User

router.get('/user/', userController.Query.user);
router.get('/users/', userController.Query.users);
router.post('/user/auth', userController.Mutation.auth);
router.post('/user/createUser', userController.Mutation.createUser);
router.delete('/user/deleteUser', userController.Mutation.deleteUser);

// Messages

module.exports = router;