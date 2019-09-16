const express = require('express');
const router = express.Router();

const userController = require('./controllers/User');
const roomController = require('./controllers/Room');

// Generic
router.get('/', (req, res, next) => res.json({ ok: true }));

// User
router.get('/user/:id', userController.Query.user);
router.get('/users/', userController.Query.users);
router.post('/user/auth', userController.Mutation.auth);
router.post('/user/createUser', userController.Mutation.createUser);
router.delete('/user/:id', userController.Mutation.deleteUser);

// Room
router.post('/room/createRoom', roomController.Mutation.createRoom);
router.post('/room/joinRoom', roomController.Mutation.joinRoom);

// Messages

module.exports = router;