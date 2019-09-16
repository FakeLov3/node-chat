const express = require('express');
const router = express.Router();

const userQuery = require('./controllers/User').Query;

// User

router.get('/', (req, res, next) => {
    res.json({
        ok: true,
    });
});
router.get('/user/:id', userQuery.user);
router.get('/users/', userQuery.users);
// router.post('/user/auth', userController.Mutation.auth);
// router.post('/user/createUser', userController.Mutation.createUser);
// router.delete('/user/deleteUser', userController.Mutation.deleteUser);

// Messages

module.exports = router;